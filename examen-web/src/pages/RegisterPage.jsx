import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'usuario' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form.email, form.password, form.role);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Crear cuenta</h1>
          <p className="text-sm text-slate-500">Registra un usuario o un tecnico</p>
        </div>
        <Alert title={error?.message} messages={error?.errors} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Password (minimo 8 caracteres)" name="password" type="password" minLength={8}
          value={form.password} onChange={handleChange} required />
        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">Rol</label>
          <select id="role" name="role" value={form.role} onChange={handleChange}
            className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
            <option value="usuario">Usuario</option>
            <option value="tecnico">Tecnico</option>
          </select>
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear cuenta'}
        </Button>
        <p className="text-center text-sm text-slate-600">
          ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Inicia sesion</Link>
        </p>
      </form>
    </div>
  );
}
