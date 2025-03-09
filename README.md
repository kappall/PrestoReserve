# PrestoReserve

PrestoReserve is a simple reservation system that allows users to make bookings by providing their name, email, date, and time. The system supports basic CRUD operations for managing reservations. It consists of a backend built with Java and Spring Boot, and a frontend built with React.

## Features

- **Create** a reservation
- **Read** a reservation
- **Update** a reservation
- **Delete** a reservation

## Tech Stack

- **Backend:** Java, Spring Boot
- **Frontend:** React
- **Database:** In-memory (can be expanded for real databases)
- **Authentication:** Not implemented (can be added for future improvements)

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- Java 17 or later
- Node.js and npm
- Maven (or use the Maven Wrapper `mvnw`)

### Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend/
   ```

2. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
This will start the backend on port 8080.

### Frontend
1.	Navigate to the frontend/presto-reservation/ directory:
      ```bash
      cd ../frontend/presto-reservation
      ```

2.	Install the dependencies:
    ```bash
    npm install
    ```

3.	Start the React application:
      ```bash
      npm start
      ```

This will start the frontend on port 3000.

## Interacting with the App

• Once both the backend and frontend are running, open your browser and go to http://localhost:3000 to interact with the reservation system.

## Known Issues
•	The application is still in its basic form, with a minimal frontend UI.

•	Authentication and persistent storage are not yet implemented.

## License

This project is for educational purposes only.
This README should help guide users on how to run the application and give an overview of its functionality. You can expand this further as you add more features! Let me know if you'd like any changes.