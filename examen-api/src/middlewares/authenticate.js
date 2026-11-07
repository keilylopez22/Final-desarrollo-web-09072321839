import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
    const header = req.headers.authorization ?? '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'token no proporcionado ' });
    }
    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        next();
    }catch(error){
        const message= error.name==='TokenExpiredError'?'token expirado':'token invalido';
        return res.status(401).json({message});

    }


}