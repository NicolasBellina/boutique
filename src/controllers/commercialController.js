import commercialService from '../services/commercialService.js';

const CommercialController = {
    getAllCommercials: async (req, res) => {
        try {
            const commercials = await commercialService.getAll();
            res.status(200).json(commercials);
        } catch (error) {
            console.error('Erreur lors de la récupération des commerciaux:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des commerciaux' });
        }
    },

    getCommercialById: async (req, res) => {
        try {
            const commercial = await commercialService.getById(req.params.id);
            if (!commercial) {
                return res.status(404).json({ message: 'Commercial non trouvé' });
            }
            res.status(200).json(commercial);
        } catch (error) {
            console.error('Erreur lors de la récupération du commercial:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du commercial' });
        }
    },

    createCommercial: async (req, res) => {
        try {
            const commercial = await commercialService.create(req.body);
            res.status(201).json(commercial);
        } catch (error) {
            console.error('Erreur lors de la création du commercial:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la création du commercial',
            });
        }
    }, 

    updateCommercial: async (req, res) => {
        try {
            const commercial = await commercialService.update(req.params.id, req.body);
            if (!commercial) {
                return res.status(404).json({ message: 'Commercial non trouvé' });
            }
            res.status(200).json(commercial);
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la mise à jour du commercial',
                error: error.message 
            });
        }
    },

    deleteCommercial: async (req, res) => {
        try {
            await commercialService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du commercial' });
        }
    }
}

export default CommercialController;