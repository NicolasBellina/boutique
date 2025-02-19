import Commercial from '../../models/commercialModel.js';
import sequelize from '../../../database.js';

const deleteCommercial = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const commercial = await Commercial.findByPk(id);
        if (!commercial) {
            throw new Error('Commercial non trouvé');
        }

        // Supprimer le commercial
        await commercial.destroy({ transaction });

        // Valider la transaction
        await transaction.commit();
        return commercial;

    } catch (error) {
        // En cas d'erreur, annuler la transaction
        await transaction.rollback();
        throw new Error(`Erreur lors de la suppression du commercial: ${error.message}`);
    }
};

export default deleteCommercial;