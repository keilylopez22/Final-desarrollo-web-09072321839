import * as equipoRepository from '../repositories/equipo.repository.js';

export async function findAll() {
    return equipoRepository.findAll();
}
