import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nom
 *         - prix
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du produit
 *         nom:
 *           type: string
 *           description: Nom du produit
 *         prix:
 *           type: number
 *           description: Prix du produit
 *         description:
 *           type: string
 *           description: Description du produit
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupère tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
router.get('/products/:id', ProductController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             nom: "T-shirt"
 *             prix: 29.99
 *             description: "T-shirt en coton"
 *             type_produit: 1
 *             quantite_stock: 100
 *             taille_id: "M"
 *             couleur_id: "NOIR"
 *             marque_id: "NIKE"
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/products', ProductController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Met à jour un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.put('/products/:id', ProductController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprime un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.delete('/products/:id', ProductController.deleteProduct);

export default router;