import Product from '../../models/productModel.js';
import sequelize from '../../../database.js';

const deleteProduct = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Produit non trouvé');
        }

        await sequelize.query(
            'DELETE FROM [Produits].[Stock] WHERE [produit_id] = :id',
            {
                replacements: { id: id },
                transaction
            }
        );

        await product.destroy({ transaction });

        await transaction.commit();
        return product;

    } catch (error) {
        await transaction.rollback();
        throw new Error(`Erreur lors de la suppression du produit: ${error.message}`);
    }
};

export default deleteProduct;

