import { AuthContext } from "./auth-context";
import { authApi } from "../api/auth.api";
import { useCallback, useEffect, useMemo, useState } from "react";

// Los componentes de React deben empezar con mayuscula
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la app preguntamos al backend si la cookie de sesion sigue valida
    useEffect(() => {
        authApi.me()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleExpire = () => setUser(null);
        window.addEventListener('auth:expired', handleExpire);
        return () => window.removeEventListener('auth:expired', handleExpire);
    }, []);

    const login = useCallback(async (email, password) => {
        const me = await authApi.login(email, password); // el backend pone la cookie
        setUser(me);
    }, []);

    const register = useCallback(async (email, password, role) => {
        await authApi.register(email, password, role);
        await login(email, password);
    }, [login]);

    const signOut = useCallback(async () => {
        await authApi.logout().catch(() => null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user, loading, login, register, signOut
    }), [user, loading, login, register, signOut]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
