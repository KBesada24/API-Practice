import express, { Request, Response } from 'express';
import { httpResponse } from '../lib/httpResponse';
import { User } from '../models/user';
import Transaction from '../models/transaction';

const router = express.Router();

//API endpoints here
router.post('/', async (req: Request & { 
    body: { 
        amount: number; 
        description: string;
        date: Date;
        userId: string;
        } 
    }, res: Response) => {
    try {
        const { amount, description, date, userId } = req.body;

        if (!amount || !description || !userId) {
            return httpResponse(res, 400, 'Missing required fields', {});
        }

        if (!Number.isInteger(amount)) {
            return httpResponse(res, 400, 'Amount must be an integer', {});
        }

        const userDoc = await User.findById(userId);
        if (!userDoc) {
            return httpResponse(res, 400, 'User not found', {});
        }

        const transactionDoc = new Transaction({
            amount,
            description,
            date,
            user: userDoc._id
        });

        await transactionDoc.save();

        userDoc.balance += amount;
        await userDoc.save();

        return httpResponse(res, 201, 'Transaction created successfully', {
            transaction: {
                id: transactionDoc._id,
                amount: transactionDoc.amount,
                description: transactionDoc.description,
                date: transactionDoc.date,

            }
        });

        } catch (error) {
        return httpResponse(res, 500, 'Internal Server Error', {});
    }
});

export default router;