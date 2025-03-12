import Commercial from '../../models/commercialModel.js';
import sequelize from '../../../database.js';

const deleteCommercial = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }

        await commercial.destroy({ transaction });

        await transaction.commit();
        return commercial;

    } catch (error) {
        await transaction.rollback();
        throw new Error(`Erreur lors de la suppression du commercial: ${error.message}`);
    }
};

export default deleteCommercial;