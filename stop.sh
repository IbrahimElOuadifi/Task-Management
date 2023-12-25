#!/bin/bash

# Define the ports your server and client are using
SERVER_PORT=3000
CLIENT_PORT=5173 # Replace with your actual client port if different

# Find and kill the server process
SERVER_PID=$(lsof -t -i:$SERVER_PORT)
if [ ! -z "$SERVER_PID" ]; then
  echo "Stopping server process on port $SERVER_PORT..."
  kill $SERVER_PID
fi

# Find and kill the client process
CLIENT_PID=$(lsof -t -i:$CLIENT_PORT)
if [ ! -z "$CLIENT_PID" ]; then
  echo "Stopping client process on port $CLIENT_PORT..."
  kill $CLIENT_PID
fi

# Wait a moment to ensure the processes have stopped
sleep 2