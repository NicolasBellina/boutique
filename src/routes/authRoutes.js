import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Simulons des credentials valides pour le 
const VALID_CREDENTIALS = {
    email: "test@test.com",
    password: "test123"
};

// Clé secrète pour JWT (à mettre dans les variables d'environnement en production)
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Vérification des credentials
        if (email !== VALID_CREDENTIALS.email || password !== VALID_CREDENTIALS.password) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            });
        }
        
        const userData = {
            id: 1,
            email: email,
            role: 'user'
        };

        // Génération du token JWT
        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            success: true,
            token: token,
            user: userData
        });
    } catch (error) {
        console.error('Erreur lors du login:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router; 