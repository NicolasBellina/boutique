import getAllProducts from '../methods/getAllProducts.js';
import getProductById from '../methods/getProductById.js'
import createProduct from '../methods/createProduct.js'


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
    },

    getProductById: async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Tentative de récupération du produit avec ID:', id);
            const product = await getProductById(id);
            
            if (!product) {
                return res.status(404).json({ message: 'Produit non trouvé' });
            }
            
            console.log('Produit récupéré:', product);
            res.status(200).json(product);
        } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
        }
    },

    createProduct: async (req, res) => {
        try {
            console.log('Données reçues:', req.body);
            const product = await createProduct(req.body);
            console.log('Produit créé:', product);
            res.status(201).json(product);
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la création du produit',
                error: error.message 
            });
        }
    }
}



export default ProductController;