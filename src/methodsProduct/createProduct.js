import Product from '../models/productModel.js';

const createProduct = async (productData) => {
  try {
    const product = await Product.create({
      nom: productData.nom,
      description: productData.description,
      prix: productData.prix,
      type_produit: productData.type_produit,
      quantite_stock: productData.quantite_stock,
      taille_id: productData.taille_id,
      couleur_id: productData.couleur_id,
      marque_id: productData.marque_id,
    });
    return product;
  } catch (error) {
    throw new Error(`Erreur lors de la création du produit: ${error}`);
  }
};

export default createProduct;