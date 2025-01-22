import Product from '../models/productModel.js';

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            return product;
        } else {
            throw new Error('Produit non trouvé');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du produit: ${error}`);
    }
};

export default deleteProduct;