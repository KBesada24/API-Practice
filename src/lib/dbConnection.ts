import mongoose from 'mongoose';

export async function connectToDatabase() {
    const db = (await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name' as string)).connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    return db;
}
