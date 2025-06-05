import express from 'express';
import cors from 'cors';
import employeRoutes from './routes/employesRoutes.js';
import authRoutes from './authRoutes.js';

const app = express();

// Configuration CORS
app.use(cors({
    origin: ['http://localhost:5175', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});


// Routes API
app.use('/api/employes', employeRoutes);
app.use('/api/auth', authRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur:', err);
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