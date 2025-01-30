import Commercial from '../models/commercialModel.js';

export default async function createCommercial(data) {
    try {
        // Créer le commercial
        const commercial = await Commercial.create({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            est_actif: data.est_actif
        });

        return commercial;
    } catch (error) {
        console.error('Erreur lors de la création du commercial:', error);
        throw error;
    }
}