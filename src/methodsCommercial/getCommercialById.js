import Commercial from '../models/commercialModel.js';

export default async function getCommercialById(id) {
    try {
        const commercial = await Commercial.findByPk(id, {
            attributes: ['id_commercial', 'nom', 'prenom', 'email', 'est_actif']
        });
        return commercial;
    } catch (error) {
        console.error('Erreur lors de la récupération du commercial:', error);
        throw error;
    }
}