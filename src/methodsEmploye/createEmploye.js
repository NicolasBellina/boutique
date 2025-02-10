import Employe from '../models/employeModel.js';

const createEmploye = async (employeData) => {
  try {
    return await Employe.create(employeData);
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'employé: ${error}`);
  }
};

export default createEmploye;