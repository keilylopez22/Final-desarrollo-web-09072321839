import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { equipoApi } from '../api/equipos.api';
import { incidenciaApi } from '../api/incidencias.api';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

function formatFecha(fecha) {
  return fecha ? new Date(fecha).toLocaleString() : '';
}

export default function IncidenciasPage() {
  const { user, signOut } = useAuth();
  const [equipos, setEquipos] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ equipoId: '', descripcion: '' });
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [cerrandoId, setCerrandoId] = useState(null);

  // Carga inicial de equipos e incidencias
  useEffect(() => {
    Promise.all([equipoApi.getAll(), incidenciaApi.getAll()])
      .then(([eq, inc]) => {
        setEquipos(eq);
        setIncidencias(inc);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const nueva = await incidenciaApi.create(Number(form.equipoId), form.descripcion);
      setIncidencias((prev) => [nueva, ...prev]);
      setForm({ equipoId: '', descripcion: '' });
    } catch (err) {
      setFormError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCerrar = async (id) => {
    setError(null);
    setCerrandoId(id);
    try {
      const cerrada = await incidenciaApi.cerrar(id);
      setIncidencias((prev) => prev.map((i) => (i.id === id ? cerrada : i)));
    } catch (err) {
      setError(err); // p. ej. 403 si el backend no permite cerrarla
    } finally {
      setCerrandoId(null);
    }
  };

  // Solo es para mostrar u ocultar el boton: quien decide de verdad es el backend
  const puedeCerrar = (inc) =>
    inc.estado === 'abierta' && (user.role === 'tecnico' || inc.userId === user.id);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-slate-800">Incidencias del laboratorio</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">{user.email}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${user.role === 'tecnico'
              ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
              {user.role}
            </span>
            <Button variant="secondary" onClick={signOut}>Cerrar sesion</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-4 lg:grid-cols-3">
        <div className="space-y-6">
          {/* Formulario para registrar incidencia */}
          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-3 font-semibold text-slate-800">Registrar incidencia</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Alert title={formError?.message} messages={formError?.errors} />
              <div>
                <label htmlFor="equipoId" className="mb-1 block text-sm font-medium text-slate-700">Equipo</label>
                <select id="equipoId" required value={form.equipoId}
                  onChange={(e) => setForm({ ...form, equipoId: e.target.value })}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                  <option value="">Selecciona un equipo</option>
                  {equipos.map((eq) => (
                    <option key={eq.id} value={eq.id}>{eq.nombre} — {eq.ubicacion}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-slate-700">Descripcion</label>
                <textarea id="descripcion" required rows={4} maxLength={1000} value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Describe el problema"
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </form>
          </section>

          {/* Listado de equipos */}
          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-3 font-semibold text-slate-800">Equipos ({equipos.length})</h2>
            <ul className="divide-y divide-slate-100 text-sm">
              {equipos.map((eq) => (
                <li key={eq.id} className="flex justify-between py-2">
                  <span className="font-medium text-slate-700">{eq.nombre}</span>
                  <span className="text-slate-500">{eq.ubicacion}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Listado de incidencias */}
        <section className="rounded-xl bg-white p-4 shadow lg:col-span-2">
          <h2 className="mb-3 font-semibold text-slate-800">Incidencias</h2>
          <Alert title={error?.message} messages={error?.errors} />
          {loading ? (
            <p className="text-sm text-slate-500">Cargando...</p>
          ) : incidencias.length === 0 ? (
            <p className="text-sm text-slate-500">No hay incidencias registradas.</p>
          ) : (
            <ul className="mt-2 space-y-3">
              {incidencias.map((inc) => (
                <li key={inc.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        #{inc.id} · {inc.equipo?.nombre}
                        <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${inc.estado === 'abierta'
                          ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                          {inc.estado}
                        </span>
                      </p>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-700">{inc.descripcion}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Registrada por {inc.creador?.email} el {formatFecha(inc.createdAt)}
                      </p>
                      {inc.estado === 'cerrada' && (
                        <p className="text-xs text-slate-500">
                          Cerrada por {inc.cerradaPor?.email} el {formatFecha(inc.fechaCierre)}
                        </p>
                      )}
                    </div>
                    {puedeCerrar(inc) && (
                      <Button variant="danger" onClick={() => handleCerrar(inc.id)} disabled={cerrandoId === inc.id}>
                        {cerrandoId === inc.id ? 'Cerrando...' : 'Cerrar'}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
