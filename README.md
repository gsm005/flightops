Hosted- http://13.48.129.108/
#### Server API
is_safe (all data)
http://16.16.122.130/flight-safe?flight=AB123
flight_details
http://16.16.122.130/flight-details?flight=AB123

### Tech Stack Explanation

#### Frontend: ReactJS

**Concept**: ReactJS is a popular JavaScript library for building user interfaces, particularly single-page applications where data changes frequently over time.

**Principles**:
1. **Component-Based Architecture**: Allows building encapsulated components that manage their own state and can be composed to create complex UIs.
2. **Declarative**: Makes it easy to design interactive UIs by declaring what the UI should look like at any given state.
3. **Efficiency**: Utilizes a virtual DOM to optimize rendering and improve performance.

**Usage**:
- **Dashboard Interface**: Displays real-time flight status, weather conditions, and risk alerts.
- **Interactive Maps**: Shows current flight paths and suggested optimal routes.
- **Alerts and Notifications**: Provides pilots and authorities with timely updates and warnings.

#### Backend: Python Flask

**Concept**: Flask is a lightweight WSGI web application framework in Python. It's designed to make getting started quick and easy, with the ability to scale up to complex applications.

**Principles**:
1. **Minimalism**: Flask provides the essentials to get an application up and running without unnecessary overhead.
2. **Extensibility**: Through its modular design, developers can add various extensions to suit their needs.
3. **Simplicity**: Encourages clean and readable code, making it easy to develop and maintain.

**Usage**:
- **API Endpoints**: Handles requests from the frontend and interacts with external APIs (FlightStats, OpenMeteo, Flight Plan DB) to gather and process data.
- **Data Processing**: Integrates with machine learning models to assess risks and optimize flight routes.
- **Database Interactions**: Manages data storage and retrieval from the SQLite database.

#### Database: SQLite

**Concept**: SQLite is a C-language library that provides a relational database management system. It is known for being self-contained, serverless, and zero-configuration.

**Principles**:
1. **Serverless**: No server setup or configuration required; the database is integrated directly into the application.
2. **Lightweight**: Small footprint makes it ideal for applications that need an embedded database.
3. **Transactional**: Supports ACID properties, ensuring data integrity and reliability.

**Usage**:
- **Data Storage**: Stores flight data, weather conditions, risk assessments, and optimization results.
- **Data Retrieval**: Provides quick access to stored data for real-time analysis and visualization.
- **Scalability**: Suitable for lightweight, embedded applications without the overhead of a full-fledged database server.

#### Cloud: AWS EC2

**Concept**: Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS cloud, allowing developers to run applications on virtual servers.

**Principles**:
1. **Scalability**: Automatically scales up or down based on the demand, ensuring optimal performance.
2. **Flexibility**: Wide range of instance types and configurations to suit different application needs.
3. **Reliability**: High availability and robust infrastructure provided by AWS.

**Usage**:
- **Hosting Backend Services**: Runs the Flask backend application and manages API requests.
- **Data Processing**: Executes machine learning models and data analysis tasks.
- **Real-time Updates**: Ensures the system can handle real-time data processing and deliver timely updates.

#### APIs: FlightStats, OpenMeteo, Flight Plan DB

**FlightStats API**:
- **Purpose**: Provides real-time flight data, including flight status, departure and arrival times, and delays.
- **Usage**: Gathers up-to-date flight information to monitor and assess flight conditions.

**OpenMeteo API**:
- **Purpose**: Offers weather data and forecasts, including temperature, precipitation, wind speed, and other meteorological factors.
- **Usage**: Integrates weather data to assess flight risks and optimize routes based on current and forecasted conditions.

**Flight Plan DB API**:
- **Purpose**: Provides data on flight plans and routes, helping to generate and optimize navigation paths.
- **Usage**: Utilizes flight plan data to create optimal routes considering safety and efficiency.



#### OpenMeteo API

https://open-meteo.com/en/docs

## Screenshots
![dashboard1](https://github.com/gsm005/flightops/assets/118417410/093baa12-9216-4c22-bd34-80dccf8387d7)
![dashboard21](https://github.com/gsm005/flightops/assets/118417410/222ae82a-07e2-4045-9203-492e763a92c0)
![dashboard22](https://github.com/gsm005/flightops/assets/118417410/f438aa2b-3675-40d4-be29-3984ad471330)
![dashboard23](https://github.com/gsm005/flightops/assets/118417410/78eb53ed-f14b-48bf-a421-60dcbf1290d9)
![dashboard24](https://github.com/gsm005/flightops/assets/118417410/24efccf5-2fd7-4e0d-8bcb-395099032af7)
