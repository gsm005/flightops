import requests
import joblib
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry

def get_weather_data(lat, lon):
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "precipitation", "weather_code", "wind_speed_10m", "wind_gusts_10m"],
        "hourly": "temperature_2m",
    }
    
    responses = openmeteo.weather_api(url, params=params)
    return responses

def extract_weather_features(weather_data, lat, lon):
    response=weather_data[0]
    current = response.Current()
    features = {
        'Latitue':lat,
        'Longitude':lon,
        'Temperature': current.Variables(0).Value(),
        'Wind_Speed': current.Variables(3).Value(),
        'Wind_Gust': current.Variables(4).Value(),
        'Precipitation': current.Variables(1).Value(),
        'Weather_code': current.Variables(2).Value()
    }
    return features

model = joblib.load('RandomForest.joblib')

def predict_weather_safety(features):
    features_df = pd.DataFrame([features])
    ans= model.predict(features_df)
    if features['Precipitation']>=0.6 and features['Weather_code']>=7 and features['Wind_Speed']>=30 and features['Wind_Gust']>=35:
        ans=1
    else:
        ans=0
    return ans
