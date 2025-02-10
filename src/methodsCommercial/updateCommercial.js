import Commercial from '../models/commercialModel.js';

const updateCommercial = async (id, commercialData) => {
    try {
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }
        return await commercial.update(commercialData);
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du commercial: ${error}`);
    }
};

export default updateCommercial;