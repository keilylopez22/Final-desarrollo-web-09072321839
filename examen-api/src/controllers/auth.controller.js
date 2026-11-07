import * as authService from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SESSION_COOKIE, sessionCookieOptions } from '../config/session.js';

const SALT = 10;
const DUMMY_PASSWORD = bcrypt.hashSync('12345678', SALT);

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await authService.findByEmail(email);
    const valid = await bcrypt.compare(password, user?.password_hash ?? DUMMY_PASSWORD);
    if (!user || !valid) {
        return res.status(401).json({ message: 'credenciales invalidas' });
    }
    // El rol va dentro de la sesion para que el backend lo pueda verificar
    const token = jwt.sign(
        { sub: String(user.id), email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256' }
    );
    const { exp } = jwt.decode(token);
    res.cookie(SESSION_COOKIE, token, sessionCookieOptions(exp * 1000 - Date.now()));
    res.json({ id: user.id, email: user.email, role: user.role });
}

export async function register(req, res) {
    const { email, password, role } = req.body;
    const user = await authService.findByEmail(email);
    if (user) {
        return res.status(409).json({ message: 'email ya registrado' });
    }
    const passwordHash = await bcrypt.hash(password, SALT);
    const newUser = await authService.createUser(email, passwordHash, role);
    res.status(201).json(newUser);
}

export function logout(req, res) {
    res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
    res.status(204).send();
}

export function me(req, res) {
    res.json({ id: Number(req.auth.sub), email: req.auth.email, role: req.auth.role });
}
