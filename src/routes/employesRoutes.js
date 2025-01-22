import express from 'express';
import EmployeController from '../controllers/employesController.js';

const router = express.Router();

// Routes pour les employés
router.get('/employes', EmployeController.getAllEmployes);
router.get('/employes/:id', EmployeController.getEmployeById);
router.post('/employes', EmployeController.createEmploye);
router.put('/employes/:id', EmployeController.updateEmploye);
router.delete('/employes/:id', EmployeController.deleteEmploye);

export default router;