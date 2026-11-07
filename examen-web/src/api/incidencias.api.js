import { apiFetch } from "./client";

export const incidenciaApi = {
    getAll: () => apiFetch('/incidencias'),
    create: (equipoId, descripcion) => apiFetch('/incidencias', { method: 'POST', body: { equipoId, descripcion } }),
    cerrar: (id) => apiFetch(`/incidencias/${id}/cerrar`, { method: 'PATCH' }),
}
