import { apiFetch } from "./client";

export const tecnicoApi = {
    getAll: () => apiFetch('/tecnicos'),
    getById: (id) => apiFetch(`/tecnicos/${id}`),
    create: (tecnico) => apiFetch('/tecnicos', { method: 'POST', body: tecnico }),
    update: (id, tecnico) => apiFetch(`/tecnicos/${id}`, { method: 'PUT', body: tecnico }),
    remove: (id) => apiFetch(`/tecnicos/${id}`, { method: 'DELETE' }),
}
