import Commercial from '../models/commercialModel.js';

export default async function getAllCommercials() {
    try {
        const commercials = await Commercial.findAll({
            attributes: ['id_commercial', 'nom', 'prenom', 'email', 'est_actif'],
            order: [['nom', 'ASC']]
        });
        return commercials;
    } catch (error) {
        console.error('Erreur lors de la récupération des commerciaux:', error);
        throw error;
    }
} 