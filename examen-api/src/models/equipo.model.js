import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Equipo = sequelize.define('Equipo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'equipo',
    timestamps: false
});
