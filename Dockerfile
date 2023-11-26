# Use an official Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files
COPY . .

# Build the app
RUN npm run build

# Set environment variable for the port
ENV PORT=8080

# Expose the port the app runs on
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]
