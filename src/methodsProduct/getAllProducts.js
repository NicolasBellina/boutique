import Product from '../models/productModel.js';

const getAllProducts = async () => {
    try {
        return await Product.findAll();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des produits: ${error}`);
    }
};

export default getAllProducts; 