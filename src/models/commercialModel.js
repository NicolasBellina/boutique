import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

/**
 * Modèle Commercial
 * @typedef {Object} Commercial
 * @property {number} id_commercial - Identifiant unique du commercial
 * @property {string} nom - Nom du commercial
 * @property {string} prenom - Prénom du commercial
 * @property {string} email - Email du commercial
 * @property {boolean} est_actif - Statut actif
 */
const Commercial = sequelize.define('Commercial', {
    id_commercial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_commercial',
        comment: 'Identifiant unique du commercial'
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'nom',
        validate: {
            notEmpty: true,
            len: [2, 255]
        },
        comment: 'Nom du commercial'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'email',
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        },
        comment: 'Email du commercial'
    },
    est_actif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'est_actif',
        comment: 'Statut actif'
    },
    prenom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'prenom',
        validate: {
            notEmpty: true,
            len: [2, 255]
        },
        comment: 'Prénom du commercial'
    }
}, {
    tableName: 'commercial',
    schema: 'dbo',
    timestamps: false,
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

// Synchroniser le modèle avec la base de données
(async () => {
    try {
        await Commercial.sync({ alter: true });
        console.log('✅ Table Commercial synchronisée avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de la synchronisation de la table Commercial:', error);
    }
})();

export default Commercial;