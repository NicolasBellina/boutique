import Commercial from '../../models/commercialModel.js';

const getAllCommercials = async () => {
    try {
        const commercials = await Commercial.findAll({
            attributes: [
                ['id_commercial', 'id'],
                'nom',
                'prenom',
                'email',
                'est_actif'
            ],
            where: {
                est_actif: true
            },
            order: [
                ['nom', 'ASC'],
                ['prenom', 'ASC']
            ]
        });

        if (!commercials || commercials.length === 0) {
            console.log('Aucun commercial actif trouvé');
            return [];
        }

        // Transformer les données pour le format attendu par le front
        const formattedCommercials = commercials.map(commercial => {
            const plainCommercial = commercial.get({ plain: true });
            return {
                id: plainCommercial.id,
                nom: plainCommercial.nom,
                prenom: plainCommercial.prenom,
                email: plainCommercial.email,
                est_actif: plainCommercial.est_actif
            };
        });

        console.log(`${formattedCommercials.length} commerciaux actifs trouvés`);
        return formattedCommercials;
    } catch (error) {
        console.error('Erreur dans getAllCommercials:', error);
        throw new Error(`Erreur lors de la récupération des commerciaux: ${error.message}`);
    }
};

export default getAllCommercials; 