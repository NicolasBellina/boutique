import sql from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

console.log('Configuration de la base de données:', {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql'
});

const config = new sql.Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, 
                trustServerCertificate: true,
            },
        },
        port: process.env.DB_PORT,
        logging: true,
        define: {
            schema: 'dbo'
        }
    },
);

// Test de la connexion
config.authenticate()
    .then(async () => {
        console.log('✅ Connexion à la base de données réussie.');
        
        // Vérifier le contenu de la table Produits
        const [results] = await config.query('SELECT TOP 5 * FROM Produits.Produits');
        console.log('Exemple de produits dans la base:', results);
        
        // Liste des tables
        return config.query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = \'BASE TABLE\'');
    })
    .then(([tables]) => {
        console.log('Tables disponibles dans la base de données:', tables);
    })
    .catch(err => {
        console.error('❌ Erreur de connexion:', err);
    });

export default config;