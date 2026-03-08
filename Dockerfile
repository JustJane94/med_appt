FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the server files (which includes the 'build' folder after npm run build)
COPY server/package*.json ./
RUN npm install

COPY server/ .

# Expose the port the app runs on
EXPOSE 8181

# Command to run the application
CMD ["node", "index.js"]