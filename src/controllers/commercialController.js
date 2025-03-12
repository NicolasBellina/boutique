import commercialService from '../services/commercialService.js';

const CommercialController = {
    getAllCommercials: async (req, res) => {
        try {
            console.log('Tentative de récupération de tous les commerciaux actifs...');
            const commercials = await commercialService.getAll();
            
            if (!commercials || commercials.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Aucun commercial actif trouvé',
                    count: 0,
                    data: []
                });
            }

            res.status(200).json({
                success: true,
                message: `${commercials.length} commerciaux trouvés`,
                count: commercials.length,
                data: commercials
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des commerciaux:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur lors de la récupération des commerciaux',
                error: error.message 
            });
        }
    },

    getCommercialById: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du commercial manquant'
                });
            }

            console.log('Tentative de récupération du commercial avec ID:', id);
            const commercial = await commercialService.getById(id);
            
            if (!commercial) {
                return res.status(404).json({
                    success: false,
                    message: 'Commercial non trouvé ou inactif'
                });
            }

            res.status(200).json({
                success: true,
                data: commercial
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du commercial:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du commercial',
                error: error.message
            });
        }
    },

    createCommercial: async (req, res) => {
        try {
            const { nom, prenom, email, telephone, secteur } = req.body;

            // Validation des champs obligatoires
            if (!nom || !prenom || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'Les champs nom, prénom et email sont obligatoires'
                });
            }

            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Format d\'email invalide'
                });
            }

            const commercialData = {
                nom: nom.trim(),
                prenom: prenom.trim(),
                email: email.trim(),
                telephone: telephone ? telephone.trim() : null,
                secteur: secteur ? secteur.trim() : null
            };

            console.log('Tentative de création d\'un commercial avec les données:', commercialData);
            const commercial = await commercialService.create(commercialData);
            
            res.status(201).json({
                success: true,
                message: 'Commercial créé avec succès',
                data: commercial
            });
        } catch (error) {
            console.error('Erreur lors de la création du commercial:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur lors de la création du commercial',
                error: error.message
            });
        }
    }, 

    updateCommercial: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du commercial manquant'
                });
            }

            // Vérification de l'existence du commercial
            const existingCommercial = await commercialService.getById(id);
            if (!existingCommercial) {
                return res.status(404).json({
                    success: false,
                    message: 'Commercial non trouvé'
                });
            }

            const { nom, prenom, email, telephone, secteur } = req.body;

            // Préparation des données à mettre à jour
            const updateData = {};
            
            if (nom !== undefined) updateData.nom = nom.trim();
            if (prenom !== undefined) updateData.prenom = prenom.trim();
            if (email !== undefined) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Format d\'email invalide'
                    });
                }
                updateData.email = email.trim();
            }
            if (telephone !== undefined) updateData.telephone = telephone.trim() || null;
            if (secteur !== undefined) updateData.secteur = secteur.trim() || null;

            console.log('Tentative de mise à jour du commercial avec ID:', id);
            console.log('Données de mise à jour:', updateData);
            
            const commercial = await commercialService.update(id, updateData);
            res.status(200).json({
                success: true,
                message: 'Commercial mis à jour avec succès',
                data: commercial
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du commercial:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour du commercial',
                error: error.message
            });
        }
    },

    deleteCommercial: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du commercial manquant'
                });
            }

            // Vérification de l'existence du commercial
            const existingCommercial = await commercialService.getById(id);
            if (!existingCommercial) {
                return res.status(404).json({
                    success: false,
                    message: 'Commercial non trouvé'
                });
            }

            console.log('Tentative de suppression du commercial avec ID:', id);
            await commercialService.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Commercial supprimé avec succès'
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du commercial:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du commercial',
                error: error.message
            });
        }
    }
};

export default CommercialController;