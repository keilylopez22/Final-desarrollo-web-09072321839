import { apiFetch } from "./client";

export const authApi = {
    login: (email, password) => apiFetch('/auth/login', { method: 'POST', body: { email, password } }),
    register: (email, password, role) => apiFetch('/auth/register', { method: 'POST', body: { email, password, role } }),
    logout: () => apiFetch('/auth/logout', { method: 'POST' }),
    me: () => apiFetch('/auth/me'),
}
