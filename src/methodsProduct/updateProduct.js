import Product from '../models/productModel.js';

const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByPk(id);
    
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    await product.update(productData);
    
    return product;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du produit: ${error.message}`);
  }
};

export default updateProduct;