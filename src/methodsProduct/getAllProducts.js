import Product from '../models/productModel.js';

const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des produits: ${error}`);
  }
};

export default getAllProducts;