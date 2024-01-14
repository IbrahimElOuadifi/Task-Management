#!/bin/bash

# Start the server
cd server
npm run watch & # Assuming this is a background process that compiles your code
npm run serve &
# npm run dev &

# Start the client
cd ../client
npm run dev &

wait

echo "Client and server started"