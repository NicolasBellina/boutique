import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import determineCoupureGeneric from '../DAB/dab.js';

// Configuration des chemins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des routes
const routes = {
    '/': { template: '../pages/home.ejs', title: 'Accueil' },
    '/about': { template: '../pages/about.ejs', title: 'À propos' },
    '/contact': { template: '../pages/contact.ejs', title: 'Contact' },
    '/socket': { template: '../pages/socket.ejs', title: 'Chat' }
};

export function handleRoute(request, response, isAdmin) {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    // Gestion du mode admin
    if (pathname === '/toggle-admin') {
        response.writeHead(302, {
            'Set-Cookie': `isAdmin=${!isAdmin}; Path=/`,
            'Location': '/'
        });
        return response.end();
    }

    // Gestion des simulations DAB
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
        const route = routes[pathname] || { template: '../pages/404.ejs', title: '404' };
        const templatePath = path.join(__dirname, route.template);
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
        console.error('Erreur:', error);
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>500 - Erreur interne du serveur</h1>');
    }
}