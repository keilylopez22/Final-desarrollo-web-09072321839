import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Tecnico = sequelize.define('Tecnico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    }
}, {
    tableName: 'tecnico',
    timestamps: false
});
