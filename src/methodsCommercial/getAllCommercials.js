import Commercial from '../models/commercialModel.js';

const getAllCommercials = async () => {
    try {
        return await Commercial.findAll();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des commerciaux: ${error}`);
    }
};

export default getAllCommercials; 