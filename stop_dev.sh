#!/bin/bash

# Kill 'npm run watch' process
pkill -f "npm run watch"

# Kill 'npm run dev' processes for server and client
pkill -f "npm run dev"

echo "Development processes have been stopped."