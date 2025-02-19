import productService from '../services/productService.js';


const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            console.log('Tentative de récupération des produits...');
            const products = await productService.getAll();
            console.log('Produits récupérés:', products);
            res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur lors de la récupération des produits',
                error: error.message 
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du produit manquant'
                });
            }

            console.log('Tentative de récupération du produit avec ID:', id);
            const product = await productService.getById(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Produit non trouvé'
                });
            }
            
            console.log('Produit récupéré:', product);
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du produit',
                error: error.message
            });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { nom, prix, type_produit, quantite_stock } = req.body;

            // Validation des champs obligatoires
            if (!nom || !prix || !type_produit || !quantite_stock) {
                return res.status(400).json({
                    success: false,
                    message: 'Tous les champs obligatoires doivent être remplis (nom, prix, type_produit, quantite_stock)'
                });
            }

            // Validation des types de données
            if (typeof prix !== 'number' || prix <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Le prix doit être un nombre positif'
                });
            }

            if (!Number.isInteger(type_produit)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le type_produit doit être un nombre entier'
                });
            }

            if (typeof quantite_stock !== 'number' || quantite_stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'La quantité en stock doit être un nombre positif ou nul'
                });
            }

            console.log('Données reçues:', req.body);
            const product = await productService.create(req.body);
            console.log('Produit créé:', product);
            
            res.status(201).json({
                success: true,
                message: 'Produit créé avec succès',
                data: product
            });
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur lors de la création du produit',
                error: error.message
            });
        }
    }, 

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du produit manquant'
                });
            }

            // Vérification de l'existence du produit
            const existingProduct = await productService.getById(id);
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Produit non trouvé'
                });
            }

            // Validation des données de mise à jour
            const { prix, quantite_stock, type_produit } = req.body;
            if (prix && (typeof prix !== 'number' || prix <= 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le prix doit être un nombre positif'
                });
            }

            if (quantite_stock && (typeof quantite_stock !== 'number' || quantite_stock < 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'La quantité en stock doit être un nombre positif ou nul'
                });
            }

            if (type_produit && (!Number.isInteger(type_produit) || type_produit <= 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le type de produit doit être un nombre entier positif'
                });
            }

            const updatedProduct = await productService.update(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Produit mis à jour avec succès',
                data: updatedProduct
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour du produit',
                error: error.message
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du produit manquant'
                });
            }

            console.log('Tentative de suppression du produit avec ID:', id);
            
            // Vérification de l'existence du produit
            const existingProduct = await productService.getById(id);
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Produit non trouvé'
                });
            }
            
            const product = await productService.delete(id);
            console.log('Produit supprimé avec succès:', product);
            
            res.status(200).json({
                success: true,
                message: 'Produit supprimé avec succès',
                data: product
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du produit',
                error: error.message
            });
        }
    }
}

export default ProductController;