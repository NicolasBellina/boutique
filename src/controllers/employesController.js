import employeService from '../services/employeService.js';

const EmployeController = {
    getAllEmployes: async (req, res) => {
        try {
            console.log('Début de getAllEmployes');
            const employes = await employeService.getAll();
            console.log(`Nombre d'employés récupérés: ${employes.length}`);
            
            // Formatage des dates pour l'affichage
            const formattedEmployes = employes.map(emp => ({
                ...emp,
                date_naissance: emp.date_naissance ? new Date(emp.date_naissance).toISOString().split('T')[0] : null
            }));

            res.status(200).json({
                success: true,
                data: formattedEmployes,
                count: formattedEmployes.length
            });
        } catch (error) {
            console.error('Erreur dans getAllEmployes:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur lors de la récupération des employés',
                error: error.message 
            });
        }
    },

    getEmployeById: async (req, res) => {
        try {
            const employe = await employeService.getById(req.params.id);
            if (!employe) {
                return res.status(404).json({ message: 'Employé non trouvé' });
            }
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
            const employe = await employeService.create(req.body);
            res.status(201).json(employe);
        } catch (error) {
            console.error('Erreur lors de la création de l\'employé:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la création de l\'employé',
            });
        }
    }, 

    updateEmploye: async (req, res) => {
        try {
            const employe = await employeService.update(req.params.id, req.body);
            if (!employe) {
                return res.status(404).json({ message: 'Employé non trouvé' });
            }
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
            await employeService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'employé' });
        }
    }
}

export default EmployeController;