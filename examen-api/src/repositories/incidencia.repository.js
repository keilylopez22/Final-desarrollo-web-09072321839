import { Incidencia, Equipo, User } from '../models/index.js';

const INCLUDE = [
    { model: Equipo, as: 'equipo', attributes: ['id', 'nombre', 'ubicacion'] },
    { model: User, as: 'creador', attributes: ['id', 'email'] },
    { model: User, as: 'cerradaPor', attributes: ['id', 'email'] }
];

export async function findAll() {
    const incidencias = await Incidencia.findAll({
        include: INCLUDE,
        order: [['createdAt', 'DESC']]
    });
    return incidencias.map((i) => i.toJSON());
}

export async function findById(id) {
    const incidencia = await Incidencia.findByPk(id, { include: INCLUDE });
    return incidencia ? incidencia.toJSON() : null;
}

export async function create({ equipoId, descripcion, userId }) {
    const incidencia = await Incidencia.create({ equipoId, descripcion, userId });
    return findById(incidencia.id);
}

export async function close(id, cerradaPorId) {
    await Incidencia.update(
        { estado: 'cerrada', cerradaPorId, fechaCierre: new Date() },
        { where: { id } }
    );
    return findById(id);
}
