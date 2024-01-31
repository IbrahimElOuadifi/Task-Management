FROM node:18.1.0-alpine3.15

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code into the Docker image
COPY . .

# Expose the port that the app will be running on
EXPOSE 3000

# Build the app
RUN npm run build

# Run the app
CMD ["npm", "run", "serve"]