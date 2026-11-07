import * as authRepository from "../repositories/auth.repository.js";

export async function findByEmail(email) {
    return authRepository.findByEmail(email);
}

export async function createUser(email, password_hash, role) {
    return authRepository.createUser(email, password_hash, role);
}
