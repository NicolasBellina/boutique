import getAllEmployes from '../methodsEmploye/getAllEmploye.js'
import getEmployeById from '../methodsEmploye/getEmployeById.js'
import createEmploye from '../methodsEmploye/createEmploye.js'
import updateEmploye from '../methodsEmploye/updateEmploye.js'
import deleteEmploye from '../methodsEmploye/deleteEmploye.js'

const EmployeController = {
    getAllEmployes: async (req, res) => {
        try {
            console.log('Route /api/employes appelée');
            const employes = await getAllEmployes();
            console.log('Employés récupérés:', employes);
            res.status(200).json(employes);
        } catch (error) {
            console.error('Erreur dans getAllEmployes:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la récupération des employés',
                error: error.message 
            });
        }
    },

    getEmployeById: async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Tentative de récupération de l\'employé avec ID:', id);
            const employe = await getEmployeById(id);
            
            if (!employe) {
                console.log('Employé non trouvé pour l\'ID:', id);
                return res.status(404).json({ message: 'Employé non trouvé' });
            }
            
            console.log('Employé récupéré:', employe);
            res.status(200).json(employe);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'employé:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la récupération de l\'employé',
                error: error.message 
            });
        }
    },

    createEmploye: async (req, res) => {
        try {
            console.log('Données reçues:', req.body);
            const employe = await createEmploye(req.body);
            console.log('Employé créé:', employe);
            res.status(201).json(employe);
        } catch (error) {
            console.error('Erreur lors de la création du employé:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la création du employé',
            });
        }
    }, 

    updateEmploye: async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Tentative de mise à jour de l\'employé:', id, req.body);
            
            const employe = await updateEmploye(id, req.body);
            
            if (!employe) {
                return res.status(404).json({ message: 'Employé non trouvé' });
            }
            
            console.log('Employé mis à jour avec succès:', employe);
            res.status(200).json(employe);
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la mise à jour de l\'employé',
                error: error.message 
            });
        }
    },

    deleteEmploye: async (req, res) => {
        try {
            const id = req.params.id;
            const employe = await deleteEmploye(id);
            res.status(204).json(employe);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du employé' });
        }
    }
}

export default EmployeController;