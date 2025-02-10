import Employe from '../models/employeModel.js';

const getEmployeById = async (id) => {
  try {
    const employe = await Employe.findByPk(id);

    if (!employe) {
      throw new Error('Employé non trouvé');
    }

    return employe;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'employé: ${error}`);
  }
};

export default getEmployeById;