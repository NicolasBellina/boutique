import sql from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

console.log('Configuration de la base de données:', {
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'mssql'
});

const config = new sql.Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, 
                trustServerCertificate: true,
            },
        },
        port: process.env.DB_PORT,
        logging: false,
        define: {
            schema: 'dbo'
        }
    },
);

// Test de la connexion
config.authenticate()
    .then(async () => {
        console.log('✅ Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('❌ Erreur de connexion:', err);
    });

    

export default config;