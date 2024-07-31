import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

interface UserPayload {
    _id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { jwtToken } = req.cookies; 
    console.log('This is the token:', jwtToken);

    if (!jwtToken) {
        return next(); // No token present, just proceed to the next middleware
    }
    
    try {
        const user = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
        console.log('This is the user:', user);
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        next(error); // Pass the error to the next error-handling middleware
    }
}
