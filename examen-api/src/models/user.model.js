import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ROLES = ['usuario', 'tecnico'];

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(...ROLES),
        allowNull: false,
        defaultValue: 'usuario'
    }
}, {
    tableName: 'users',
    timestamps: false
});
