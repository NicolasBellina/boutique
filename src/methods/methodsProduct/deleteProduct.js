import Product from '../../models/productModel.js';
import sequelize from '../../../database.js';

const deleteProduct = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        // Vérifier si le produit existe
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Produit non trouvé');
        }

        // Supprimer d'abord les enregistrements de stock liés
        await sequelize.query(
            'DELETE FROM [Produits].[Stock] WHERE [produit_id] = :id',
            {
                replacements: { id: id },
                transaction
            }
        );

        // Ensuite supprimer le produit
        await product.destroy({ transaction });

        // Valider la transaction
        await transaction.commit();
        return product;

    } catch (error) {
        // En cas d'erreur, annuler la transaction
        await transaction.rollback();
        throw new Error(`Erreur lors de la suppression du produit: ${error.message}`);
    }
};

export default deleteProduct;

