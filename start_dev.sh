#!/bin/bash

# Navigate to the server directory and run 'npm run watch'
echo "Starting 'npm run watch' on the server..."
cd server
yarn watch &

# Wait for 'npm run watch' to set up
# You might need to adjust the sleep duration based on how long 'npm run watch' takes to start
echo "Waiting for 'npm run watch' to initialize..."
sleep 5

# In the background, start 'npm run dev' on the server
echo "Starting 'npm run dev' on the server..."
yarn dev &

# Navigate to the client directory and run 'npm run dev'
echo "Starting 'npm run dev' on the client..."
cd ../client
yarn dev &

# Wait for both 'npm run dev' processes to start
wait

echo "Client and Server are both running in development mode."