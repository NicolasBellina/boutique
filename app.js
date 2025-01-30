import http from 'http';
import fs from 'fs';
import ejs from 'ejs';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import employesRoutes from './src/routes/employesRoutes.js';
import commercialRoutes from './src/routes/commercialRoutes.js';

// Configuration des chemins pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);
    next();
});

// Configuration des routes statiques
app.use(express.static(path.join(__dirname, 'public')));


// Routes API
app.use('/api', productRoutes);
app.use('/api', employesRoutes);
app.use('/api', commercialRoutes);
app.use('/api', authRoutes);

// Routes publiques
app.get('/login', (req, res) => {
    res.send('Login page');
});
app.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

// Routes protégées
app.use('/api/employes', employesRoutes); // Protection de toutes les routes employés
app.use('/api/products', productRoutes); // Protection de toutes les routes produits
app.use('/api/commercials', commercialRoutes); // Protection de toutes les routes commerciaux
app.use('/api/auth', authRoutes); // Protection de toutes les routes auth

// Création du serveur HTTP avec Express
const server = http.createServer(app);

// Configuration de Socket.IO
const io = new Server(server);

// Gestion des routes pour les pages
app.get('/', (req, res) => {
    renderPage(res, 'src/pages/home.ejs', 'Accueil');
});

app.get('/about', (req, res) => {
    renderPage(res, 'src/pages/about.ejs', 'À propos');
});

app.get('/socket', (req, res) => {
    renderPage(res, 'src/pages/socket.ejs', 'Chat');
});

app.get('/employes', (req, res) => {
    renderPage(res, 'src/pages/employes.ejs', 'Employés');
});

app.get('/products', (req, res) => {
    renderPage(res, 'src/pages/products.ejs', 'Produits');
});

app.get('/commercials', (req, res) => {
    renderPage(res, 'src/pages/commercial.ejs', 'Commercials');
});

app.get('/contact', (req, res) => {
    renderPage(res, 'src/pages/contact.ejs', 'Contact');
});

// Fonction pour rendre les pages
function renderPage(res, template, title) {
    try {
        const templatePath = path.join(__dirname, template);
        const content = fs.readFileSync(templatePath, 'utf8');
        const rendered = ejs.render(content, {
            isAdmin: false, // Vous pouvez gérer cela via les cookies si nécessaire
            title: `${title} - DAB Simulator`
        }, {
            filename: templatePath,
            views: [path.join(__dirname, '..')]
        });
        res.send(rendered);
    } catch (error) {
        console.error('Erreur lors du rendu de la page:', error);
        res.status(500).send('<h1>500 - Erreur interne du serveur</h1>');
    }
}

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    socket.on("join", (username) => {
        socket.username = username;
        io.emit("message", {
            type: "system",
            content: `${username} a rejoint le chat`
        });
    });

    socket.on("chat_message", (message) => {
        io.emit("chat_message", {
            type: "chat",
            user: socket.username,
            content: message
        });
    });

    socket.on("disconnect", () => {
        if (socket.username) {
            io.emit("message", {
                type: "system",
                content: `${socket.username} a quitté le chat`
            });
        }
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});