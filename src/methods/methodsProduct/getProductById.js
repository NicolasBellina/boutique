import Product from '../../models/productModel.js';

const getProductById = async (id) => {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du produit: ${error}`);
  }
};

export default getProductById;