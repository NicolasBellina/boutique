import express from 'express';
import commercialController from '../controllers/commercialController.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Commercial:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du commercial
 *         nom:
 *           type: string
 *           description: Nom du commercial
 *         prenom:
 *           type: string
 *           description: Prénom du commercial
 *         email:
 *           type: string
 *           description: Email du commercial
 */

/**
 * @swagger
 * /api/commercials:
 *   get:
 *     summary: Récupère tous les commerciaux
 *     tags: [Commerciaux]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commerciaux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commercial'
 */
router.get("/commercials", authMiddleware, commercialController.getAllCommercials);

/**
 * @swagger
 * /api/commercials/{id}:
 *   get:
 *     summary: Récupère un commercial par son ID
 *     tags: [Commerciaux]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commercial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le commercial trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commercial'
 */
router.get("/commercials/:id", authMiddleware, commercialController.getCommercialById);

/**
 * @swagger
 * /api/commercials:
 *   post:
 *     summary: Crée un nouveau commercial
 *     tags: [Commerciaux]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commercial'
 *     responses:
 *       201:
 *         description: Commercial créé avec succès
 */
router.post("/commercials", authMiddleware, commercialController.createCommercial);

/**
 * @swagger
 * /api/commercials/{id}:
 *   put:
 *     summary: Met à jour un commercial
 *     tags: [Commerciaux]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commercial
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commercial'
 *     responses:
 *       200:
 *         description: Commercial mis à jour avec succès
 */
router.put("/commercials/:id", authMiddleware, commercialController.updateCommercial);

/**
 * @swagger
 * /api/commercials/{id}:
 *   delete:
 *     summary: Supprime un commercial
 *     tags: [Commerciaux]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commercial
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Commercial supprimé avec succès
 */
router.delete("/commercials/:id", authMiddleware, commercialController.deleteCommercial);

export default router;