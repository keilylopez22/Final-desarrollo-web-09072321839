import * as incidenciaService from '../services/incidencia.service.js';
import { ServiceError } from '../services/incidencia.service.js';

function handleError(error, res) {
    if (error instanceof ServiceError) {
        return res.status(error.status).json({ message: error.message });
    }
    throw error;
}

export async function getAll(req, res) {
    const incidencias = await incidenciaService.findAll();
    res.json(incidencias);
}

export async function postIncidencia(req, res) {
    try {
        const { equipoId, descripcion } = req.body;
        const incidencia = await incidenciaService.create({
            equipoId,
            descripcion,
            userId: Number(req.auth.sub) // el creador sale de la sesion, nunca del body
        });
        res.status(201).json(incidencia);
    } catch (error) {
        handleError(error, res);
    }
}

export async function cerrarIncidencia(req, res) {
    try {
        const incidencia = await incidenciaService.close(req.params.id, req.auth);
        res.json(incidencia);
    } catch (error) {
        handleError(error, res);
    }
}
