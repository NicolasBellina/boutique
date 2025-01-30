import Commercial from '../models/commercialModel.js';

export default async function deleteCommercial(id) {
    try {
        // Vérifier si le commercial existe
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }

        // Supprimer le commercial
        await commercial.destroy();
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression du commercial:', error);
        throw error;
    }
}