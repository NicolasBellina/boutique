import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const Employe = sequelize.define('Employes', {
  id_employe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_employe'
  },
    nom: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nom'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'role'
  },
  salaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'salaire'
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'date_naissance'
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'adresse'
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telephone'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email'
  }
}, {
  tableName: 'Ressources',
  schema: 'Employes',
  timestamps: false,
  freezeTableName: true
});

/// Synchroniser le modèle avec la base de données
sequelize.sync({ alter: false }); 

export default Employe;