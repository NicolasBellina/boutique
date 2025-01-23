import Product from '../models/productModel.js';

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      where: {
        est_actif: true
      },
      attributes: [
        'id_produit',
        'nom',
        'description',
        'prix',
        'type_produit',
        'quantite_stock',
        'taille_id',
        'couleur_id',
        'marque_id',
      ]
    });
    return products;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des produits: ${error}`);
  }
};

export default getAllProducts;