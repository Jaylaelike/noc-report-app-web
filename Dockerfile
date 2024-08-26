# Start from the official Node.js LTS base image
FROM node:20-alpine


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

COPY drizzle ./drizzle/

# Install dependencies
RUN npm install

RUN npm ci

# Copy all files
COPY . .

RUN npm run build --verbose

# Expose the listening port
EXPOSE 3002

# Run npm start script
CMD ["npm", "run", "dev"]