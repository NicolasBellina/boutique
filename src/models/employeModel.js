import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

/**
 * Modèle Employe
 * @typedef {Object} Employe
 * @property {number} id_employe - Identifiant unique de l'employé
 * @property {string} nom - Nom de l'employé
 * @property {string} prenom - Prénom de l'employé
 * @property {string} role - Rôle de l'employé
 * @property {number} salaire - Salaire de l'employé
 * @property {Date} date_naissance - Date de naissance
 * @property {string} adresse - Adresse
 * @property {string} telephone - Téléphone
 * @property {string} email - Email
 */
const Employe = sequelize.define('Employes', {
  id_employe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_employe',
    comment: "Identifiant unique de l'employé"
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nom',
    validate: {
      notEmpty: true,
      len: [2, 100]
    },
    comment: "Nom de l'employé"
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'prenom',
    validate: {
      notEmpty: true,
      len: [2, 100]
    },
    comment: "Prénom de l'employé"
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'role',
    comment: "Rôle de l'employé"
  },
  salaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'salaire',
    validate: {
      min: 0
    },
    comment: 'Salaire de l\'employé'
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_naissance',
    comment: 'Date de naissance'
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'adresse',
    comment: 'Adresse'
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'telephone',
    comment: 'Téléphone',
    validate: {
      len: [0, 20]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'email',
    validate: {
      isEmail: true,
      notEmpty: true
    },
    comment: 'Email'
  }
}, {
  tableName: 'Employes',
  schema: 'dbo',
  timestamps: false,
  freezeTableName: true
});

export default Employe;