import { User } from '../models/index.js';

export async function findByEmail(email) {
    return User.findOne({
        where: { email },
        attributes: ['id', 'email', 'password_hash'],
        raw: true
    });
}

export async function createUser(email, password_hash) {
    const user = await User.create({ email, password_hash });
    return { id: user.id, email: user.email };
}
