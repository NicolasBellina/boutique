import Employe from '../models/employeModel.js';

const createEmploye = async (employeData) => {
  try {
    const employe = await Employe.create({
      nom: employeData.nom,
      email: employeData.email,
      telephone: employeData.telephone,
      adresse: employeData.adresse,
      role: employeData.role,
      salaire: employeData.salaire,
      date_naissance: employeData.date_naissance
    });
    return employe;
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'employé: ${error}`);
  }
};

export default createEmploye;