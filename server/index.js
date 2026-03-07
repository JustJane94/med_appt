const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

// 1. Script started...
console.log("1. Script started and imports finished.");

const app = express();
const PORT = process.env.PORT || 8181;

// 2. Connecting to Mongo...
console.log("2. Connecting to Mongo...");
connectToMongo();

// Middleware
app.use(express.json());



// index.js
app.use(cors({
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token', 'email'] // ADDED 'email'
}));

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 3. Reaching the bottom of the file
console.log("3. Reaching the bottom of the file...");

// 4. Start the server
app.listen(PORT, () => {
    console.log(`4. SUCCESS: Server is running on port http://localhost:${PORT}`);
});