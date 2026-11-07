// Nombre y opciones de la cookie de sesion
export const SESSION_COOKIE = 'session';

export function sessionCookieOptions(maxAge) {
    return {
        httpOnly: true,                                  // JavaScript del navegador no puede leerla
        sameSite: 'lax',                                 // protege contra CSRF en peticiones cross-site
        secure: process.env.NODE_ENV === 'production',   // solo HTTPS en produccion
        path: '/',
        ...(maxAge !== undefined && { maxAge })
    };
}
