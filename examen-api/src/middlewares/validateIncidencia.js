export function validateId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'el id debe de ser un entero positivo' });
    }
    req.params.id = id;
    next();
}

export function validateBody(req, res, next) {
    const { equipoId, descripcion } = req.body ?? {};
    const errors = [];
    const id = Number(equipoId);
    if (!Number.isInteger(id) || id <= 0) {
        errors.push('equipoId es obligatorio y debe ser un entero positivo');
    }
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        errors.push('descripcion es obligatoria');
    } else if (descripcion.length > 1000) {
        errors.push('descripcion no puede tener mas de 1000 caracteres');
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: 'datos invalidos', errors });
    }
    req.body = { equipoId: id, descripcion: descripcion.trim() };
    next();
}
