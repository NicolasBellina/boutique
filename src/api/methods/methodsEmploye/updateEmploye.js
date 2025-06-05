import Employe from '../../models/employeModel.js';

const updateEmploye = async (id, employeData) => {
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            throw new Error('Employé non trouvé');
        }
        return await employe.update(employeData);
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'employé: ${error}`);
    }
};

export default updateEmploye;