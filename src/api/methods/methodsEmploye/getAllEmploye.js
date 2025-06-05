import Employe from '../../models/employeModel.js';

const getAllEmploye = async () => {
  try {
    console.log('Tentative de récupération des employés...');
    const employes = await Employe.findAll({
      raw: true, // Pour obtenir des objets JavaScript simples
      attributes: [
        'id_employe',
        'nom',
        'prenom',
        'role',
        'salaire',
        'date_naissance',
        'adresse',
        'telephone',
        'email'
      ],
      order: [
        ['nom', 'ASC'],
        ['prenom', 'ASC']
      ]
    });
    
    console.log(`${employes.length} employés trouvés`);
    return employes;
  } catch (error) {
    console.error('Erreur dans getAllEmploye:', error);
    throw new Error(`Erreur lors de la récupération des employés: ${error.message}`);
  }
};

export default getAllEmploye;