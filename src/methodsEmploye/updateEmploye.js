import Employe from '../models/employeModel.js';

const updateEmploye = async (id, employeData) => {
  try {
    console.log('Données de mise à jour:', id, employeData);
    
    const employe = await Employe.findByPk(id);
    
    if (!employe) {
      throw new Error('Employé non trouvé');
    }

    // Mise à jour des champs
    const updatedEmploye = await employe.update({
      nom: employeData.nom,
      email: employeData.email || employe.email,
      telephone: employeData.telephone || employe.telephone,
      adresse: employeData.adresse || employe.adresse,
      role: employeData.role || employe.role,
      salaire: employeData.salaire,
      date_naissance: employeData.date_naissance
    });

    console.log('Employé mis à jour:', updatedEmploye);
    return updatedEmploye;
  } catch (error) {
    console.error('Erreur dans updateEmploye:', error);
    throw new Error(`Erreur lors de la mise à jour de l'employé: ${error.message}`);
  }
};

export default updateEmploye;