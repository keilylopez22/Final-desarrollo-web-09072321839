import { Tecnico } from '../models/index.js';

export async function findAll() {
    return Tecnico.findAll({ order: [['id', 'ASC']], raw: true });
}

export async function findById(id) {
    return Tecnico.findByPk(id, { raw: true });
}

export async function create(nombre, especialidad, telefono, email) {
    const tecnico = await Tecnico.create({
        nombre,
        especialidad: especialidad ?? null,
        telefono: telefono ?? null,
        email: email ?? null
    });
    return tecnico.toJSON();
}

export async function update(id, nombre, especialidad, telefono, email) {
    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) {
        return null;
    }
    await tecnico.update({
        nombre,
        especialidad: especialidad ?? null,
        telefono: telefono ?? null,
        email: email ?? null
    });
    return tecnico.toJSON();
}

export async function remove(id) {
    const deletedRows = await Tecnico.destroy({ where: { id } });
    return deletedRows > 0;
}

export async function findByEmail(email) {
    return Tecnico.findOne({ where: { email }, raw: true });
}
