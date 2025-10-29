import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

// User interface
export interface User {
    username: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    balance: number;
    createdAt?: Date;
    updatedAt?: Date;
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
}

// User document interface for Mongoose
export interface UserDocument extends User, Document {
    _id: mongoose.Types.ObjectId;
}

// User schema
const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    passwordSalt: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

userSchema.methods.setPassword = function(password: string) {
    this.passwordSalt = crypto.randomBytes(16).toString('hex');

    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');

    return;
}

userSchema.methods.validatePassword = function(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
}


// User model
export const User = mongoose.model<UserDocument>('User', userSchema);