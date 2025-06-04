import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

/**
 * Modèle Product
 * @typedef {Object} Product
 * @property {number} id_produit - Identifiant unique du produit
 * @property {string} nom - Nom du produit
 * @property {string} description - Description du produit
 * @property {number} prix - Prix du produit
 * @property {number} type_produit - Type du produit
 * @property {number} quantite_stock - Quantité en stock
 * @property {number} taille_id - Référence à la taille
 * @property {number} couleur_id - Référence à la couleur
 * @property {number} marque_id - Référence à la marque
 */
const Product = sequelize.define('Products', {
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_produit',
    comment: 'Identifiant unique du produit'
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'nom',
    validate: {
      notEmpty: true,
      len: [2, 255]
    },
    comment: 'Nom du produit'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description',
    comment: 'Description du produit'
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'prix',
    validate: {
      min: 0
    },
    comment: 'Prix du produit'
  },
  type_produit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_produit',
    comment: 'Type du produit'
  },
  quantite_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'quantite_stock',
    validate: {
      min: 0
    },
    comment: 'Quantité en stock',
    get() {
      return this.getDataValue('quantite_stock') || 0;
    }
  },
  taille_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'taille_id',
    comment: 'Référence à la taille'
  },
  couleur_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'couleur_id',
    comment: 'Référence à la couleur'
  },
  marque_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'marque_id',
    comment: 'Référence à la marque'
  },
}, {
  tableName: 'Products',
  schema: 'dbo',
  timestamps: false,
  freezeTableName: true
});

export default Product;