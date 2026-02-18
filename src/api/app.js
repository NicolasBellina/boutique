import express from 'express';
import cors from 'cors';    
import employeRoutes from './routes/employesRoutes.js';
import authRoutes from './authRoutes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Configuration Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Boutique',
            version: '1.0.0',
            description: 'Documentation de l\'API Boutique'
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Serveur de développement'
            }
        ]
    },
    apis: ['./routes/*.js', './authRoutes.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware pour logger les requêtes
app.use((req, res, next) => {   
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes API
app.use('/api/employes', employeRoutes);
app.use('/api/products', employeRoutes);
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