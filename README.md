# Chat Application

A real-time chat application built with React, Node.js, Express, and Socket.io.

## Features

- Real-time messaging
- User authentication
- Avatar support
- Online/offline status
- Message history

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000

## Environment Variables

Create a .env file in the server directory with the following variables:
```
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/chat?retryWrites=true&w=majority

```