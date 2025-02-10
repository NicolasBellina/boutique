import Product from '../models/productModel.js';

const createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error(`Erreur lors de la création du produit: ${error}`);
  }
};

export default createProduct;