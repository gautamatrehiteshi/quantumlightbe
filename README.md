# CAN-backend-Hiteshi

## Getting started

# Requirement

Before you begin, make sure you have the following requirements in place:

1. **Node.js**: You need to have Node.js installed. You can download and install Node.js v18.17. from [here](https://nodejs.org/dist/v18.17.0/node-v18.17.0-x86.msi).

   To confirm that Node.js and npm (Node Package Manager) are installed, open your command prompt (CMD) and run the following commands:

   node --version

   You should see a version number (e.g., 18.17.0) displayed.

## Database setup

For the backend to function correctly, you'll need to set up a PostgreSQL database. Follow these steps to configure it.

1.** Install PostgreSQL**: Download and install PostgreSQL version 16.0 on your system. You can obtain the installer from the official PostgreSQL website or use a package manager suitable for your operating system.

2.** Database Configuration**: After installing PostgreSQL, set up your database. Be sure to record the database credentials, as they will be required later.

## Project Setup

Follow these steps to set up your back-end project:

1. **Clone the Repository**: Clone your project repository using Git:

   git clone https://github.com/BitBondtmUK/CAN-backend-Hiteshi.git

2. **Navigate to Project Directory**: Change your working directory to the cloned project:
   cd CAN-backend-Hiteshi

3.**Create a .env File**: In your project directory, create a .env file to store essential information, including database, port, and MQTT configurations. Customize the file with your specific settings. An **example** .env file might look like this:

APP_PORT=8080
MQTT_HOST='broker.hivemq.com'
MQTT_PORT=1883
DB_USERNAME='postgres'
DB_PASSWORD='password'
DB_NAME='test'
DB_HOST='localhost'
NODE_ENV='development'

5. **Install Dependencies**: Install project dependencies using npm. Run the following command:

   npm install

6.**Add Sensor data** : Add Sensor data in db using sequelize seeder use following command:

npx sequelize-cli db:seed:all

7. **Start the Development Server**: To start the development server, run the following command:

   npm start

8. **View in Console**: Once the development server is running, log show the message of port server running on and database connection
