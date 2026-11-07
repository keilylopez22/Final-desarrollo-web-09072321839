const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
    constructor(message, status, errors = []) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errors = errors;
    }
}

// La sesion vive en una cookie httpOnly que pone el backend.
// credentials: 'include' hace que el navegador la envie en cada peticion.
export async function apiFetch(path, { method = 'GET', body } = {}) {
    const headers = {};
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            credentials: 'include',
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError('no se pudo conectar al servidor', 0);
    }
    if (response.status === 204) {
        return null;
    }
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        if (response.status === 401 && path !== '/auth/login' && path !== '/auth/me') {
            window.dispatchEvent(new Event('auth:expired'));
        }
        throw new ApiError(data?.message ?? 'error inesperado', response.status, data?.errors ?? []);
    }
    return data;
}
