import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

// Routes pour les produits
router.get('/products', ProductController.getAllProducts);
// router.get('/products/:id', ProductController.getProductById);
// router.post('/products', ProductController.createProduct);
// router.put('/products/:id', ProductController.updateProduct);
// router.delete('/products/:id', ProductController.deleteProduct);

export default router;