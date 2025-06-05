import { DataTypes } from 'sequelize';
import sequelize from '../../../database.js';

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
    comment: "Identifiant unique de l'employé"
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    },
    comment: "Nom de l'employé"
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    },
    comment: "Prénom de l'employé"
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "Rôle de l'employé"
  },
  salaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    },
    comment: 'Salaire de l\'employé'
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date de naissance'
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Adresse'
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      len: [0, 20]
    },
    comment: 'Téléphone'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
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