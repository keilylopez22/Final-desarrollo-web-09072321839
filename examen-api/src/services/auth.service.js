import * as authRepository from "../repositories/auth.repository.js";

export async function findByEmail(email) {
    const user = await authRepository.findByEmail(email);
    return user;
    
}

export async function createUser(email, password_hash) {
    const user= await authRepository.createUser(email,password_hash);
    return user;
    
}