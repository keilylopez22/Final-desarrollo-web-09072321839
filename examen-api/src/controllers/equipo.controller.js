import * as equipoService from '../services/equipo.service.js';

export async function getAll(req, res) {
    const equipos = await equipoService.findAll();
    res.json(equipos);
}
