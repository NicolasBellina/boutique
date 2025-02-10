import Product from '../models/productModel.js';

const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByPk(id);
    
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    return await product.update(productData);
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du produit: ${error}`);
  }
};

export default updateProduct;