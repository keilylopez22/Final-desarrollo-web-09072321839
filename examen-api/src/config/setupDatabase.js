import { DataTypes } from 'sequelize';
import { sequelize, Equipo } from '../models/index.js';
import { ROLES } from '../models/user.model.js';

// La tabla "users" ya existia antes de agregar roles: sync() no modifica
// tablas existentes, asi que agregamos la columna "role" si falta.
async function addRoleColumnIfMissing() {
    const queryInterface = sequelize.getQueryInterface();
    const columns = await queryInterface.describeTable('users');
    if (!columns.role) {
        await queryInterface.addColumn('users', 'role', {
            type: DataTypes.ENUM(...ROLES),
            allowNull: false,
            defaultValue: 'usuario'
        });
        console.log('columna "role" agregada a users');
    }
}

// Equipos de ejemplo del laboratorio (solo si la tabla esta vacia)
async function seedEquipos() {
    const total = await Equipo.count();
    if (total === 0) {
        await Equipo.bulkCreate([
            { nombre: 'PC-01', ubicacion: 'Laboratorio A' },
            { nombre: 'PC-02', ubicacion: 'Laboratorio A' },
            { nombre: 'PC-03', ubicacion: 'Laboratorio B' },
            { nombre: 'Impresora HP', ubicacion: 'Laboratorio B' },
            { nombre: 'Proyector Epson', ubicacion: 'Laboratorio C' }
        ]);
        console.log('equipos de ejemplo creados');
    }
}

export async function setupDatabase() {
    await sequelize.sync(); // crea las tablas que no existan
    await addRoleColumnIfMissing();
    await seedEquipos();
}
