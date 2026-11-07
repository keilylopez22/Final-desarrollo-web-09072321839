import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ESTADOS = ['abierta', 'cerrada'];

export const Incidencia = sequelize.define('Incidencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM(...ESTADOS),
        allowNull: false,
        defaultValue: 'abierta'
    },
    fechaCierre: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'incidencia',
    underscored: true,  // equipoId -> equipo_id, createdAt -> created_at
    timestamps: true,
    updatedAt: false
});
