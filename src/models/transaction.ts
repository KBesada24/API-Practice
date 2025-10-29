import mongoose, { Document, Schema, ObjectId } from 'mongoose';

export interface Transaction extends Document {
    description: string;
    userId: ObjectId;
    amount: number;
    date: Date;
}

const transactionSchema: Schema = new Schema<Transaction>({
    userId: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
});

const Transaction = mongoose.model<Transaction>('Transaction', transactionSchema);

export default Transaction;
