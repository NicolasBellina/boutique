import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Employe from './src/api/models/employeModel.js';

dotenv.config();

console.log('Configuration de la base de données:', {
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'postgres'
});

const config = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true,
                enableArithAbort: true
            }
        },
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
);

// Test de la connexion et synchronisation des modèles
config.authenticate()
    .then(async () => {
        console.log('✅ Connexion à la base de données réussie.');
        try {
            // Synchronisation des modèles avec la base de données
            await config.sync({ alter: true }); 
            console.log('✅ Synchronisation des modèles réussie.');
        } catch (error) {
            console.error('❌ Erreur lors de la synchronisation des modèles:', error);
        }
    })
    .catch(err => {
        console.error('❌ Erreur de connexion:', err);
    });

export default config;