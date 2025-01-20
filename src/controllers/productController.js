import getAllProducts from '../methods/getAllProducts.js';

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            console.log('Tentative de récupération des produits...');
            const products = await getAllProducts();
            console.log('Produits récupérés:', products);
            res.status(200).json(products);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
        }
    }
};

export default ProductController;