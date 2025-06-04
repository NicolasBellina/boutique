import sequelize from '../../database.js';
import Product from './productModel.js';
import Employe from './employeModel.js';
import Commercial from './commercialModel.js';

// Ici tu peux ajouter les associations si besoin, par exemple :
// Product.belongsTo(Employe, { foreignKey: 'employe_id' });
// Employe.hasMany(Product, { foreignKey: 'employe_id' });

export { Product, Employe, Commercial };

// Synchronisation globale (à appeler une seule fois au démarrage)
export async function syncModels() {
  try {
    await sequelize.sync({ alter: false });
    console.log('✅ Tous les modèles sont synchronisés avec la base de données');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation des modèles :', error);
  }
} 