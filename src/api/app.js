import express from 'express';
import cors from 'cors';    
import employeRoutes from './routes/employesRoutes.js';
import authRoutes from './authRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {   
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes API
app.use('/api/employes', employeRoutes);
app.use('/api/auth', authRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: err.message
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});