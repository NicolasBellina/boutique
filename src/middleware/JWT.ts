import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
    userId: string;
    [key: string]: any;
}

module.exports = (req: Request, res: Response, next: NextFunction): void => {
    try {
        var token = req.headers.authorization;
        const tokenParts = token?.split(' ');
        token = tokenParts ? tokenParts[1] : undefined;
        console.log("token", token);

        if (!token) {
            res.status(401).json({ error: 'Token manquant' });
            return;
        }
        try {
            const decodedToken = jwt.verify(token, '1234567890') as DecodedToken;
            let userId: string;
            if (typeof decodedToken !== 'string' && 'userId' in decodedToken) {
                userId = decodedToken.userId;
            } else {
                throw new Error('Invalid token payload');
            }
            (req as any).userId = userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalide' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
};