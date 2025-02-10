import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: "Token manquant ou format incorrect" 
            });
        }

        // Extraire le token (enlever 'Bearer ')
        const token = authHeader.split(' ')[1];

        try {
            // Vérifier et décoder le token
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Ajouter les informations de l'utilisateur à la requête
            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                message: "Token invalide ou expiré" 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Erreur lors de la vérification du token" 
        });
    }
};

export default authMiddleware;