# 1. Use an official Node.js runtime as the base image
FROM node:18

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY server/package*.json ./
RUN npm install

# 4. Copy the rest of the server code (including the 'build' folder)
COPY server/ .

# 5. The app runs on port 8181 (as defined in your index.js)
EXPOSE 8181

# 6. Start the server
CMD ["node", "index.js"]