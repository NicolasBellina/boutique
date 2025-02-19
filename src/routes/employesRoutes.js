import express from 'express';
import EmployeController from '../controllers/employesController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employe:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'employé
 *         nom:
 *           type: string
 *           description: Nom de l'employé
 *         prenom:
 *           type: string
 *           description: Prénom de l'employé
 *         email:
 *           type: string
 *           description: Email de l'employé
 */

/**
 * @swagger
 * /api/employes:
 *   get:
 *     summary: Récupère tous les employés
 *     tags: [Employés]
 *     responses:
 *       200:
 *         description: Liste des employés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employe'
 */
router.get('/employes', EmployeController.getAllEmployes);

/**
 * @swagger
 * /api/employes/{id}:
 *   get:
 *     summary: Récupère un employé par son ID
 *     tags: [Employés]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Détails de l'employé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       404:
 *         description: Employé non trouvé
 */
router.get('/employes/:id', EmployeController.getEmployeById);

/**
 * @swagger
 * /api/employes:
 *   post:
 *     summary: Crée un nouvel employé
 *     tags: [Employés]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'employé
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'employé
 *               email:
 *                 type: string
 *                 description: Email de l'employé
 *               role:
 *                 type: string
 *                 description: Rôle de l'employé
 *               salaire:
 *                 type: number
 *                 description: Salaire de l'employé
 *               date_naissance:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'employé
 *               adresse:
 *                 type: string
 *                 description: Adresse de l'employé
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone de l'employé
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/employes', EmployeController.createEmploye);

/**
 * @swagger
 * /api/employes/{id}:
 *   put:
 *     summary: Met à jour un employé
 *     tags: [Employés]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employe'
 *     responses:
 *       200:
 *         description: Employé mis à jour avec succès
 *       404:
 *         description: Employé non trouvé
 */
router.put('/employes/:id', EmployeController.updateEmploye);

/**
 * @swagger
 * /api/employes/{id}:
 *   delete:
 *     summary: Supprime un employé
 *     tags: [Employés]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     responses:
 *       204:
 *         description: Employé supprimé avec succès
 *       404:
 *         description: Employé non trouvé
 */
router.delete('/employes/:id', EmployeController.deleteEmploye);

export default router;