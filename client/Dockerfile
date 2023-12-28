# Use an official Node.js runtime as a parent image
FROM node:16.18.1-alpine

# Set the working directory in the container
WORKDIR /client

#Set Args from docker-compose file
ARG apiurl

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL ${apiurl}

# Build the React app for production
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
