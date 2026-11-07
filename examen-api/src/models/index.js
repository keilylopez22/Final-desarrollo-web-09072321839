import { sequelize } from '../config/db.js';
import { User } from './user.model.js';
import { Tecnico } from './tecnico.model.js';
import { Equipo } from './equipo.model.js';
import { Incidencia } from './incidencia.model.js';

// Relaciones
Equipo.hasMany(Incidencia, { foreignKey: 'equipoId' });
Incidencia.belongsTo(Equipo, { foreignKey: { name: 'equipoId', allowNull: false }, as: 'equipo' });

User.hasMany(Incidencia, { foreignKey: 'userId' });
Incidencia.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'creador' });
Incidencia.belongsTo(User, { foreignKey: { name: 'cerradaPorId', allowNull: true }, as: 'cerradaPor' });

export { sequelize, User, Tecnico, Equipo, Incidencia };
