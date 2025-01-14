import express from 'express';
import determineCoupureGeneric from '../DAB/dab.js';

const router = express.Router();

// Routes des pages principales

router.get('/', (req, res) => {
    res.render('pages/home', { 
        title: 'Accueil - DAB Simulator'
    });
});

router.get('/about', (req, res) => {
    res.render('pages/about', { 
        title: 'À propos - DAB Simulator'
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', { 
        title: 'Contact - DAB Simulator'
    });
});

router.get('/socket', (req, res) => {
    res.render('pages/socket', { 
        title: 'Chat - DAB Simulator'
    });
});

// Route API pour la simulation de retrait
router.post('/simulate-withdrawal', (req, res) => {
    try {
        const { montant, typeDevise } = req.body;
        const result = determineCoupureGeneric({ montant, typeDevise });
        res.json({ success: true, result });
    } catch (error) {
        console.error('Erreur simulation:', error);
        res.status(400).json({ 
            success: false, 
            error: 'Erreur lors de la simulation' 
        });
    }
});

export default router;
