# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /web-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the code necessary for your app
COPY . .

# Env variables defining
ENV PORT=3000

# Make the container listen on the specified port at runtime
EXPOSE $PORT

# Start the app
CMD [ "npm", "start" ]