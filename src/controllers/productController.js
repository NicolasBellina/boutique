import getAllProducts from '../methods/methodsProduct/getAllProducts.js';
import getProductById from '../methods/methodsProduct/getProductById.js'
import createProduct from '../methods/methodsProduct/createProduct.js'
import updateProduct from '../methods/methodsProduct/updateProduct.js'
import deleteProduct from '../methods/methodsProduct/deleteProduct.js'

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
            });
        }
    }, 

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await updateProduct(id, req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Tentative de suppression du produit avec ID:', id);
            
            const product = await deleteProduct(id);
            console.log('Produit supprimé avec succès:', product);
            
            res.status(200).json({
                success: true,
                message: 'Produit supprimé avec succès',
                data: product
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            if (error.message.includes('Produit non trouvé')) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        }
    }
}

export default ProductController;