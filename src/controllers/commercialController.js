import createCommercial from '../methods/methodsCommercial/createCommercial.js'
import getCommercialById from '../methods/methodsCommercial/getCommercialById.js'
import deleteCommercial from '../methods/methodsCommercial/deleteCommercial.js'
import updateCommercial from '../methods/methodsCommercial/updateCommercial.js'
import getAllCommercials from '../methods/methodsCommercial/getAllCommercials.js'

const getAllCommercialsController = async (req, res) => {
    try {
        const commercials = await getAllCommercials(req.body);
        if (!commercials || commercials.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Aucun commercial trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: commercials
        });
    } catch (error) {
        console.error('Erreur dans getAllCommercialsController:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des commerciaux',
            error: error.message
        });
    }
};

const getCommercialByIdController = async (req, res) => {
    try {
        const commercial = await getCommercialById(req.params.id);
        if (!commercial) {
            return res.status(404).json({
                success: false,
                message: 'Commercial non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: commercial
        });
    } catch (error) {
        console.error('Erreur dans getCommercialByIdController:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du commercial',
            error: error.message
        });
    }
};

const updateCommercialController = async (req, res) => {
    try {
        const commercial = await updateCommercial(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: commercial,
            message: 'Commercial mis à jour avec succès'
        });
    } catch (error) {
        console.error('Erreur dans updateCommercialController:', error);
        if (error.message === 'Commercial non trouvé') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour du commercial',
            error: error.message
        });
    }
};

const createCommercialController = async (req, res) => {  
    try {
        // Valider les données requises
        if (!req.body.nom || !req.body.prenom || !req.body.email) {
            return res.status(400).json({
                success: false,
                message: 'Le nom, le prénom et l\'email sont requis'
            });
        }

        const commercial = await createCommercial(req.body);
        
        res.status(201).json({
            success: true,
            data: commercial,
            message: 'Commercial créé avec succès'
        });
    } catch (error) {
        console.error('Erreur dans createCommercialController:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'Un commercial avec cet email existe déjà'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du commercial',
            error: error.message
        });
    }
};

const deleteCommercialController = async (req, res) => {
    try {
        const result = await deleteCommercial(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Commercial non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial supprimé avec succès'
        });
    } catch (error) {
        console.error('Erreur dans deleteCommercialController:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Erreur lors de la suppression du commercial'
        });
    }
};

export default { 
    getAllCommercialsController,
    getCommercialByIdController, 
    deleteCommercialController, 
    updateCommercialController, 
    createCommercialController 
};