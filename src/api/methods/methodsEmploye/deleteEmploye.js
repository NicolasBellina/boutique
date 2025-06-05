import Employe from '../../models/employeModel.js';
import sequelize from '../../../../database.js';

const deleteEmploye = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            throw new Error('Employé non trouvé');
        }

        await employe.destroy({ transaction });

        await transaction.commit();
        return employe;

    } catch (error) {
        await transaction.rollback();
        throw new Error(`Erreur lors de la suppression de l'employé: ${error.message}`);
    }
};

export default deleteEmploye;