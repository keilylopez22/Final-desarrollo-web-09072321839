import { Equipo } from '../models/index.js';

export async function findAll() {
    return Equipo.findAll({ order: [['nombre', 'ASC']], raw: true });
}

export async function findById(id) {
    return Equipo.findByPk(id, { raw: true });
}
