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
            const { nom, prix, type_produit, quantite_stock, description, taille_id, couleur_id, marque_id } = req.body;

            // Validation des champs obligatoires
            if (!nom || !prix || !type_produit || quantite_stock === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Tous les champs obligatoires doivent être remplis (nom, prix, type_produit, quantite_stock)'
                });
            }

            // Nettoyage et validation des données
            const productData = {
                nom: nom.trim(),
                description: description ? description.trim() : null,
                prix: Number(prix),
                type_produit: Number(type_produit),
                quantite_stock: Number(quantite_stock),
                taille_id: taille_id || null,
                couleur_id: couleur_id || null,
                marque_id: marque_id || null
            };

            // Validation des types de données
            if (isNaN(productData.prix) || productData.prix <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Le prix doit être un nombre positif'
                });
            }

            if (!Number.isInteger(productData.type_produit) || productData.type_produit <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Le type_produit doit être un nombre entier positif'
                });
            }

            if (!Number.isInteger(productData.quantite_stock) || productData.quantite_stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'La quantité en stock doit être un nombre entier positif ou nul'
                });
            }

            console.log('Données reçues:', productData);
            const product = await productService.create(productData);
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

            const { nom, prix, type_produit, quantite_stock, description, taille_id, couleur_id, marque_id } = req.body;

            // Préparation des données à mettre à jour
            const updateData = {};
            
            if (nom !== undefined) updateData.nom = nom.trim();
            if (description !== undefined) updateData.description = description.trim();
            if (prix !== undefined) updateData.prix = Number(prix);
            if (type_produit !== undefined) updateData.type_produit = Number(type_produit);
            if (quantite_stock !== undefined) updateData.quantite_stock = Number(quantite_stock);
            if (taille_id !== undefined) updateData.taille_id = taille_id || null;
            if (couleur_id !== undefined) updateData.couleur_id = couleur_id || null;
            if (marque_id !== undefined) updateData.marque_id = marque_id || null;

            // Validation des données
            if (updateData.prix !== undefined && (isNaN(updateData.prix) || updateData.prix <= 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le prix doit être un nombre positif'
                });
            }

            if (updateData.type_produit !== undefined && (!Number.isInteger(updateData.type_produit) || updateData.type_produit <= 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le type de produit doit être un nombre entier positif'
                });
            }

            if (updateData.quantite_stock !== undefined && (!Number.isInteger(updateData.quantite_stock) || updateData.quantite_stock < 0)) {
                return res.status(400).json({
                    success: false,
                    message: 'La quantité en stock doit être un nombre entier positif ou nul'
                });
            }

            console.log('Données de mise à jour:', updateData);
            const updatedProduct = await productService.update(id, updateData);
            
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