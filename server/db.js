const mongoose = require('mongoose');

// We use the local 127.0.0.1 address without the password placeholder
const mongoURI = "mongodb://127.0.0.1:27017/stayhealthybeta1";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI);
        console.info('Connected to Mongo Successfully');
        return;
    } catch (error) {
        console.error("Mongo Connection Error:", error.message);
        const nextRetryCount = count + 1;
        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }
        console.info(`Retrying, retry count: ${nextRetryCount}`);
        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;