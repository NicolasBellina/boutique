import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Clé secrète pour signer les tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expiré' });
        }
        return res.status(401).json({ message: 'Token invalide' });
    }
};

// Générer un token JWT
const generateToken = (userData) => {
    return jwt.sign(
        userData,
        JWT_SECRET,
        { expiresIn: '1h' } // Le token expire après 1 heure
    );
};

// Vérifier et décoder un token
const decodeToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token invalide ou expiré');
    }
};

// Middleware pour les routes admin
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès non autorisé' });
    }
    next();
};

// Middleware pour vérifier les rôles
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès non autorisé pour ce rôle' });
        }
        next();
    };
};

// Rafraîchir un token
const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
        delete decoded.exp;
        delete decoded.iat;
        return generateToken(decoded);
    } catch (error) {
        throw new Error('Impossible de rafraîchir le token');
    }
};

export {
    verifyToken,
    generateToken,
    decodeToken,
    requireAdmin,
    checkRole,
    refreshToken
};