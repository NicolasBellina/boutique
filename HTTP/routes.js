import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

// Fonction pour gérer les routes


// Fonction pour afficher une page avec EJS
const renderEJS = (filePath, data, response) => {
  // On lit le fichier EJS demandé
  fs.readFile(path.resolve(filePath), 'utf-8', (err, content) => {
    if (err) {
      // Si il y a une erreur, on affiche une page 500
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>500 - Erreur interne du serveur</h1>');
    } else {
      // On rend le fichier EJS en remplaçant les données
      const renderedContent = ejs.render(content, data);
      // On affiche le contenu rendu
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(renderedContent);
    }
  });
};

