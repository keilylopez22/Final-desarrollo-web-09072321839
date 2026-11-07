import * as tecnicoRepository from '../repositories/tecnico.repository.js';

export async function findAll() {
    return tecnicoRepository.findAll();
}

export async function findById(id) {
    return tecnicoRepository.findById(id);
}

export async function findByEmail(email) {
    return tecnicoRepository.findByEmail(email);
}

export async function create(nombre, especialidad, telefono, email) {
    return tecnicoRepository.create(nombre, especialidad, telefono, email);
}

export async function update(id, nombre, especialidad, telefono, email) {
    return tecnicoRepository.update(id, nombre, especialidad, telefono, email);
}

export async function remove(id) {
    return tecnicoRepository.remove(id);
}
