import Commercial from '../models/commercialModel.js';

const getCommercialById = async (id) => {
    try {
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }
        return commercial;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du commercial: ${error}`);
    }
};

export default getCommercialById;