import jwt from 'jsonwebtoken';
import { SESSION_COOKIE } from '../config/session.js';

// Lee la sesion desde la cookie httpOnly y deja los datos en req.auth
// req.auth = { sub, email, role }
export function authenticate(req, res, next) {
    const token = req.cookies?.[SESSION_COOKIE];
    if (!token) {
        return res.status(401).json({ message: 'no hay sesion activa' });
    }
    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        next();
    } catch (error) {
        const message = error.name === 'TokenExpiredError' ? 'sesion expirada' : 'sesion invalida';
        return res.status(401).json({ message });
    }
}
