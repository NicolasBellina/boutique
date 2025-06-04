import express from 'express';
import employesRoutes from './src/routes/employesRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import commercialRoutes from './src/routes/commercialRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

const router = express.Router();

// Utiliser les routes
router.use('/api/employes', employesRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/commercials', commercialRoutes);
router.use('/api/products', productRoutes);

export default router;
