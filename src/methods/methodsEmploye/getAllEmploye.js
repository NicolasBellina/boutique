import Employe from '../../models/employeModel.js';

const getAllEmploye = async () => {
  try {
    return await Employe.findAll();
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des employés: ${error}`);
  }
};

export default getAllEmploye;