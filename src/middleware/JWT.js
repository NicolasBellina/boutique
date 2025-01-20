import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



module.exports = (req, res, next) => {
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
            const decodedToken = jwt.verify(token, '1234567890');
            let userId = '';
            if (typeof decodedToken !== 'string' && 'userId' in decodedToken) {
                userId = decodedToken.userId;
            } else {
                throw new Error('Invalid token payload');
            }
            req.userId = userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalide' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
};