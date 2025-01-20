import http from 'http';
import url from 'url';
import fs from 'fs';
import ejs from 'ejs';
import { parse } from 'cookie';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import determineCoupureGeneric from '../API/src/DAB/dab.js';
import sequelize from './database.js';
import ProductController from './src/controllers/productController.js';
import express from 'express';
import productRoutes from './src/routes/productRoutes.js';

// Configuration des chemins pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes API
app.use('/api', productRoutes);

// Création du serveur HTTP
const server = http.createServer(async (request, response) => {
    console.log('URL demandée : %s %s', request.method, request.url);
    const pathname = url.parse(request.url, true).pathname;
    const cookies = request.headers.cookie ? parse(request.headers.cookie) : {};
    const isAdmin = cookies.isAdmin === 'true';

    // Si c'est une route API, laisser Express la gérer
    if (pathname.startsWith('/api/')) {
        return app(request, response);
    }

    // Gestion des simulations DAB (dab.js)
    if (pathname === '/simulate-withdrawal' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => body += chunk);
        request.on('end', () => {
            try {
                const data = JSON.parse(body);
                const result = determineCoupureGeneric({
                    montant: data.montant,
                    typeDevise: data.typeDevise
                });
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(result);
            } catch (error) {
                console.error('Erreur simulation:', error);
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('Erreur lors de la simulation');
            }
        });
        return;
    }

    // Rendu des pages
    try {
        const routes = {
            
            '/': { template: 'src/pages/home.ejs', title: 'Accueil' },
            '/about': { template: 'src/pages/about.ejs', title: 'À propos' },
            '/socket': { template: 'src/pages/socket.ejs', title: 'Chat' },
            '/products': { template: 'src/pages/products.ejs', title: 'Produits' },
            '/contact': { template: 'src/pages/contact.ejs', title: 'Contact' },
        };

        const route = routes[pathname] || { template: 'src/pages/404.ejs', title: '404' };
        
        // Utilisation de path.join pour créer le chemin correct
        const templatePath = path.join(__dirname, route.template);
        console.log('Chemin du template:', templatePath); 
        const content = fs.readFileSync(templatePath, 'utf8');
        
        const rendered = ejs.render(content, {
            isAdmin,
            title: `${route.title} - DAB Simulator`
        }, { 
            filename: templatePath,
            views: [path.join(__dirname, '..')] 
        });

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(rendered);
    } catch (error) {
        console.error('Erreur lors du rendu de la page:', error); 
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>500 - Erreur interne du serveur</h1>');
    }
});

// Configuration de Socket.IO
const io = new Server(server);

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

    socket.on("withdrawal_request", (data) => {
        io.emit("withdrawal_result", {
            type: "withdrawal",
            user: socket.username,
            result: data.result
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
server.listen(8080, 'localhost', () => {
    console.log('Serveur démarré sur http://localhost:8080');
});


