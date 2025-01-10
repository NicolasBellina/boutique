import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
// Obtenir le nom de fichier actuel
const __filename = fileURLToPath(import.meta.url);
// Obtenir le répertoire actuel
const __dirname = path.dirname(__filename);

const app = express();

// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');
// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'pages'));

// Middleware pour analyser les cookies
app.use(cookieParser());
// Servir les fichiers statiques à partir du répertoire 'public'
app.use(express.static('public'));

// Middleware pour vérifier si l'utilisateur est admin
app.use((req, res, next) => {
    // Définir une variable locale isAdmin
    res.locals.isAdmin = req.cookies.isAdmin === 'true';
    next();
});


