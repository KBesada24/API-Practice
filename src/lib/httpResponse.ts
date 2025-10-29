import { Response } from 'express';

export function httpResponse(res: Response, status: number, message: string, data?: any): Response {
    return res.status(status).json({ message, data });
}