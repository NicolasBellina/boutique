import Product from '../../models/productModel.js';

const createProduct = async (productData) => {
  try {
    // Validation et conversion des données
    const validatedData = {
      nom: productData.nom,
      description: productData.description || null,
      prix: parseFloat(productData.prix),
      type_produit: parseInt(productData.type_produit),
      quantite_stock: parseInt(productData.quantite_stock),
      taille_id: productData.taille_id ? parseInt(productData.taille_id) : null,
      couleur_id: productData.couleur_id ? parseInt(productData.couleur_id) : null,
      marque_id: productData.marque_id ? parseInt(productData.marque_id) : null
    };

    console.log('Données validées:', validatedData);
    return await Product.create(validatedData);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    throw new Error(`Erreur lors de la création du produit: ${error.message}`);
  }
};

export default createProduct;