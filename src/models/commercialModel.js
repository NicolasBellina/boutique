import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const Commercial = sequelize.define('Commercial', {
    id_commercial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_commercial'
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'nom'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email'
    },
    est_actif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'est_actif'
    },
    prenom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'prenom'
    }
}, {
    tableName: 'commercial',
    schema: 'Utilisateurs',
    timestamps: false,
    freezeTableName: true,
    dialectOptions: {
        options: {
            encrypt: true
        }
    }
});

export default Commercial;