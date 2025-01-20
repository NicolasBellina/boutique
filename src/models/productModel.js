import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const Product = sequelize.define('Produits', {
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_produit'
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nom'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'description'
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'prix'
  },
  type_produit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_produit'
  },
  quantite_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'quantite_stock'
  },
  taille_id: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'taille_id'
  },
  couleur_id: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'couleur_id'
  },
  marque_id: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'marque_id'
  },
  materiau_id: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'materiau_id'
  }
}, {
  tableName: 'Produits',
  schema: 'Produits',
  timestamps: false,
  freezeTableName: true
});

// Synchroniser le modèle avec la base de données
sequelize.sync({ alter: false }); 

export default Product;