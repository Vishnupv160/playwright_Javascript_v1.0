# filename: dockerfile

# Base image
FROM node:18

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.38.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.jso
COPY package*.json ./

# Copy the rest of the application files
COPY . ./

# Install dependencies
RUN npm install

# Set the entry point for the container
CMD ["npm", "run", "start-execution"]