import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        return console.log('MongoDB URL not found!');
    }

    if (isConnected) return;
    if (mongoose.connections[0]?.readyState === 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error: ', error);
    }
};
