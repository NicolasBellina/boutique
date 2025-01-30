import Commercial from '../models/commercialModel.js';

export default async function updateCommercial(id, data) {
    try {
        // Vérifier si le commercial existe
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }

        // Mettre à jour les données
        const updatedCommercial = await commercial.update({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            est_actif: data.est_actif
        });

        // Recharger les données mises à jour
        await updatedCommercial.reload();

        return updatedCommercial;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du commercial:', error);
        throw error;
    }
}