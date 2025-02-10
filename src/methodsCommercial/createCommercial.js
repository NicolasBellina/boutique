import Commercial from '../models/commercialModel.js';

const createCommercial = async (commercialData) => {
    try {
        return await Commercial.create(commercialData);
    } catch (error) {
        throw new Error(`Erreur lors de la création du commercial: ${error}`);
    }
};

export default createCommercial;