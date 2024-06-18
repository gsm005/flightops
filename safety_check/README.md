# FlightOps

This is a module developed for airbus aerothon 6.0(2024), hackathon conducted by Airbus. The application allows users to input source and destination airports and provides a route safety analysis based on current weather conditions. 

## Features

- **Flight Route Safety Check:** Enter the source and destination to get the safest route based on current weather conditions.
- **Weather Data Integration:** Utilizes weather data to predict route safety.
- **Interactive Map:** Visual representation of the flight route and weather conditions.

## Prerequisites

- Python 3.x
- Flask
- Requests
- Pandas
- NumPy
- Scikit-learn
- NetworkX
- Joblib
- GeographicLib
- Requests-cache
- Retry-requests
- Open-meteo-requests

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chyash1110/aerothon.git
   cd aerothon
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Start the Flask application:

   ```bash
   python app.py
   ```

2. Open your web browser and go to `http://127.0.0.1:5000` to access the application.

## Project Structure

- `app.py`: Main application file containing the Flask server and route handlers.
- `utils/`: Contains utility modules for routing and weather data processing.
  - `routing.py`: Functions to create the graph and calculate the shortest route.
  - `weather.py`: Functions to get and process weather data.
- `templates/`: HTML templates for rendering web pages.
- `static/`: Static files such as CSS.

## How it Works

1. **Weather Data Retrieval:** The application fetches weather data for the given coordinates using the Open-Meteo API.
2. **Route Calculation:** It calculates the shortest route between the source and destination airports using NetworkX.
3. **Safety Prediction:** It predicts the safety of the route based on weather features using a pre-trained Random Forest model.
4. **Result Display:** The results, including the route and safety status, are displayed on the web page.

## Screenshots

![image](https://github.com/chyash1110/aerothon/assets/118417410/ad221d8c-a0d6-4071-a67f-5bcccf902e98)
![image](https://github.com/chyash1110/aerothon/assets/118417410/b7fc9745-8229-47bb-9789-565bf14f9375)
![image](https://github.com/chyash1110/aerothon/assets/118417410/e31a2ac3-b539-439a-85c8-d51523e68445)
![image](https://github.com/chyash1110/aerothon/assets/118417410/77d5ad23-f7de-4ce7-b359-b73d3770e16c)



