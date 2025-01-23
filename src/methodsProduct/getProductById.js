import Product from '../models/productModel.js';

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
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

    if (!product) {
      throw new Error('id du produit non trouvé');
    }

    return product;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'id du produit: ${error}`);
  }
};

export default getProductById;