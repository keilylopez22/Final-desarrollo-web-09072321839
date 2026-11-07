const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'el id debe de ser un entero positivo' });
    }
    req.params.id = id;
    next();
}

function isOptionalString(value, max) {
    return value === undefined || value === null || (typeof value === 'string' && value.length <= max);
}

export function validateBody(req, res, next) {
    const { nombre, especialidad, telefono, email } = req.body ?? {};
    const errors = [];
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        errors.push('nombre es obligatorio');
    } else if (nombre.length > 100) {
        errors.push('nombre no puede tener mas de 100 caracteres');
    }
    if (!isOptionalString(especialidad, 100)) {
        errors.push('especialidad debe de ser menor a 100 caracteres');
    }
    if (!isOptionalString(telefono, 20)) {
        errors.push('telefono debe de ser menor a 20 caracteres');
    }
    if (!isOptionalString(email, 150)) {
        errors.push('email debe de ser menor a 150 caracteres');
    } else if (typeof email === 'string' && email !== '' && !emailRegex.test(email)) {
        errors.push('email invalido');
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: 'datos invalidos', errors });
    }
    req.body = {
        nombre: nombre.trim(),
        especialidad: especialidad || null,
        telefono: telefono || null,
        email: email ? email.trim().toLowerCase() : null
    };
    next();
}
