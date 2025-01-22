import Employe from '../models/employeModel.js';

const getAllEmploye = async () => {
  try {
    const employes = await Employe.findAll({
      attributes: [
        'id_employe',
        'nom',
        'email',
        'telephone',
        'adresse',
        'role',
        'salaire',
        'date_naissance'
      ]
    });
    return employes;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des employés: ${error}`);
  }
};

export default getAllEmploye;