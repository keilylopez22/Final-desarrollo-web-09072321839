import * as tecnicoService from '../services/tecnico.service.js';

export async function getAll(req, res) {
    const tecnicos = await tecnicoService.findAll();
    res.json(tecnicos);
}

export async function getById(req, res) {
    const tecnico = await tecnicoService.findById(req.params.id);
    if (!tecnico) {
        return res.status(404).json({ message: 'tecnico no encontrado' });
    }
    res.json(tecnico);
}

export async function postTecnico(req, res) {
    const { nombre, especialidad, telefono, email } = req.body;
    if (email) {
        const existe = await tecnicoService.findByEmail(email);
        if (existe) {
            return res.status(409).json({ message: 'email ya registrado para otro tecnico' });
        }
    }
    const newTecnico = await tecnicoService.create(nombre, especialidad, telefono, email);
    res.status(201).json(newTecnico);
}

export async function putTecnico(req, res) {
    const id = req.params.id;
    const { nombre, especialidad, telefono, email } = req.body;
    if (email) {
        const existe = await tecnicoService.findByEmail(email);
        if (existe && existe.id !== id) {
            return res.status(409).json({ message: 'email ya registrado para otro tecnico' });
        }
    }
    const tecnicoUpdated = await tecnicoService.update(id, nombre, especialidad, telefono, email);
    if (!tecnicoUpdated) {
        return res.status(404).json({ message: 'tecnico no encontrado' });
    }
    res.json(tecnicoUpdated);
}

export async function deleteTecnico(req, res) {
    const tecnicoDeleted = await tecnicoService.remove(req.params.id);
    if (!tecnicoDeleted) {
        return res.status(404).json({ message: 'tecnico no encontrado' });
    }
    res.status(204).send();
}
