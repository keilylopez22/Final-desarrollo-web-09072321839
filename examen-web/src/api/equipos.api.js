import { apiFetch } from "./client";

export const equipoApi = {
    getAll: () => apiFetch('/equipos'),
}
