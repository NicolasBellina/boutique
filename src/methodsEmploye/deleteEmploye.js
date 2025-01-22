import Employe from '../models/employeModel.js';

const deleteEmploye = async (id) => {
    try {
        const employe = await Employe.findByPk(id);
        if (employe) {
            await employe.destroy();
            return employe;
        } else {
            throw new Error('Employé non trouvé');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'employé: ${error}`);
    }
};

export default deleteEmploye;