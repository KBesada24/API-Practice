import 'dotenv/config';

import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { connectToDatabase } from './lib/dbConnection';
const transactionsRouter = await import('./routes/transactions.ts');

async function start() {
    // Connect to the database
    await connectToDatabase();

    // Create Express app
    const app = express();

    // Middleware
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    app.use('/transactions', transactionsRouter.default);

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
}

start();