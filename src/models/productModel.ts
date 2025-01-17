import { DataTypes } from 'sequelize';
import sequelize from '../../database';

const Product = sequelize.define('Product', {
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type_produit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantite_stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taille_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  couleur_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  marque_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  materiau_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  est_actif: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'Produits',
  timestamps: false
});




export default Product;