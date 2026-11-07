import * as incidenciaRepository from '../repositories/incidencia.repository.js';
import * as equipoRepository from '../repositories/equipo.repository.js';

// Error con codigo HTTP para que el controlador sepa que responder
export class ServiceError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// REGLA: una incidencia solo puede cerrarla el usuario que la registro
// o un usuario con el rol "tecnico". El rol y el id salen de la sesion (cookie).
export function puedeCerrar(incidencia, auth) {
    return auth.role === 'tecnico' || incidencia.userId === Number(auth.sub);
}

export async function findAll() {
    return incidenciaRepository.findAll();
}

export async function create({ equipoId, descripcion, userId }) {
    const equipo = await equipoRepository.findById(equipoId);
    if (!equipo) {
        throw new ServiceError(400, 'el equipo no existe');
    }
    return incidenciaRepository.create({ equipoId, descripcion, userId });
}

export async function close(id, auth) {
    const incidencia = await incidenciaRepository.findById(id);
    if (!incidencia) {
        throw new ServiceError(404, 'incidencia no encontrada');
    }
    if (!puedeCerrar(incidencia, auth)) {
        throw new ServiceError(403, 'solo quien registro la incidencia o un tecnico puede cerrarla');
    }
    if (incidencia.estado === 'cerrada') {
        throw new ServiceError(409, 'la incidencia ya esta cerrada');
    }
    return incidenciaRepository.close(id, Number(auth.sub));
}
