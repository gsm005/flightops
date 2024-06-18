from flask import Flask, render_template, request, jsonify
import requests
from retry_requests import retry
import openmeteo_requests
import requests_cache
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import networkx as nx
from utils.weather import get_weather_data, extract_weather_features, predict_weather_safety
from geographiclib.geodesic import Geodesic

app = Flask(__name__)

cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/source_destination_form')
def source_destination_form():
    return render_template('source_destination_form.html')

@app.route('/flying_safety_checker')
def flying_safety_checker():
    return render_template('flying_safety_checker.html')

model = joblib.load('RandomForest.joblib')

def preprocess_data(data):
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(data)
    return scaled_data

def predict_safety(weather_data):
    scaled_data = preprocess_data(weather_data)
    prediction = model.predict(scaled_data)
    return prediction[0]

@app.route('/get_location_weather', methods=['POST'])
def get_location_weather():
    lat = request.json['latitude']
    lon = request.json['longitude']

    nominatim_url = f'https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json'
    city_response = requests.get(nominatim_url)
    city_data = city_response.json()

    city = city_data.get('address', {}).get('city', 'Unknown')

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "precipitation", "weather_code", "wind_speed_10m", "wind_gusts_10m"],
        "hourly": "temperature_2m"
    }
    responses = openmeteo.weather_api(url, params=params)
    weather_data = responses[0]
    current = weather_data.Current()

    temperature = round(current.Variables(0).Value(), 4)
    precipitation = round(current.Variables(1).Value(), 4)
    weather_code = round(current.Variables(2).Value(), 4)
    wind_speed = round(current.Variables(3).Value(), 4)
    wind_gust = round(current.Variables(4).Value(), 4)

    input_data = np.array([[lat, lon, temperature, wind_speed, wind_gust, precipitation, weather_code]])

    prediction = predict_safety(input_data)

    return jsonify({
        'city': city,
        'latitude': round(lat, 4),
        'longitude': round(lon, 4),
        'temperature': temperature,
        'wind_speed': wind_speed,
        'wind_gust': wind_gust,
        'precipitation': precipitation,
        'weather_code': weather_code,
        'is_safe': bool(prediction)
    })

@app.route('/result', methods=['POST'])
def result():
    source = request.form['source']
    destination = request.form['destination']
    df_airports = pd.read_csv('FinalApp/airports.csv')
    airport_coords = {row['Name']: (row['Latitude'], row['Longitude']) for _, row in df_airports.iterrows()}
    
    df_routes = pd.read_csv('FinalApp/routes.csv')
    route_coords = {row['Distance']: (row['Source_Name'], row['Destination_Name']) for _, row in df_routes.iterrows()}
    if not any((source == src or destination ==src) and (destination == dest or source==dest) for src, dest in route_coords.values()):
        return render_template('result.html', message="No Route Found!!")
    graph = nx.Graph()

    for _, row in df_routes.iterrows():
        graph.add_edge(row['Source_Name'], row['Destination_Name'], distance=row['Distance'])

    try:
        route = nx.shortest_path(graph, source, destination, weight='distance')
        route_coordinates = [{'lat': lat, 'lng': lon} for lat, lon in [airport_coords[airport] for airport in route]]
        print(route_coordinates)
    except nx.NetworkXNoPath:
        route_coordinates=[]
    route_coordinates = [{'lat': lat, 'lng': lon} for lat, lon in [airport_coords[airport] for airport in route]]

    unsafe_count = 0
    unsafe_threshold = 3
    unsafe_route = False

    def interpolate_points(start, end, num_points):
        geod = Geodesic.WGS84
        total_distance = geod.Inverse(start[0], start[1], end[0], end[1])['s12'] / 1000
        increment_distance = total_distance / (num_points + 1)
        initial_azimuth = geod.Inverse(start[0], start[1], end[0], end[1])['azi1']
        intermediate_points = []

        for i in range(1, num_points + 1):
            fraction = i / (num_points + 1)
            g = geod.Direct(start[0], start[1], initial_azimuth, increment_distance * i * 1000)
            intermediate_points.append({'lat': g['lat2'], 'lng': g['lon2']})

        return intermediate_points

    interpolated_route_coordinates = []
    for i in range(len(route) - 1):
        start = airport_coords[route[i]]
        end = airport_coords[route[i + 1]]
        intermediate_points = interpolate_points(start, end, num_points=10)
        for point in intermediate_points:
            lat, lon = point['lat'], point['lng']
            weather_data = get_weather_data(lat, lon)
            features = extract_weather_features(weather_data, lat, lon)
            prediction = predict_weather_safety(features)
            print(f"Prediction: {prediction}")
            if prediction == 1:
                unsafe_count += 1
                if unsafe_count >= unsafe_threshold:
                    unsafe_route = True
                    break
            else:
                unsafe_count = 0
            interpolated_route_coordinates.append({'lat': lat, 'lng': lon})
        if unsafe_route:
            break

    if unsafe_route:
        message = "Unsafe route, consider an alternative."
    else:
        message = "Safe route."

    return render_template('result.html', route=route, message=message, route_coordinates=route_coordinates, interpolate_points=interpolated_route_coordinates)

if __name__ == '__main__':
    app.run(debug=True)
