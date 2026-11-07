# Decisiones

## a) Qué entendí del problema y modelos planeados

Una app para registrar incidencias técnicas sobre los equipos de un laboratorio. Hay dos roles ( usuario  y  tecnico ) y la sesión va en una cookie. Una incidencia solo puede cerrarla quien la registró o un técnico, y eso lo valida el backend.

Modelos (Sequelize + MySQL):

- **users**: id, email, password_hash, role ( usuario  |  tecnico )
- **equipo**: id, nombre, ubicacion
- **incidencia**: id, descripcion, estado ( abierta  |  cerrada ), equipo_id, user_id (creador), cerrada_por_id, fecha_cierre, created_at
- **tecnico**: catálogo de técnicos (nombre, especialidad, teléfono, email)

## b) Qué partes delegué a la IA y por qué

- **Estructura base de la API** (rutas, controladores, servicios y repositorios), porque es código repetitivo.
- **Documentación Swagger**, porque es mecánica.
- **Seeder con datos de prueba**, para probar rápido ambos roles.
- **Formularios y listados en React**, para ahorrar tiempo en la maquetación.

La regla de cierre ( puedeCerrar  en  incidencia.service.js ) y la configuración de la cookie ( httpOnly ,  sameSite ) las revisé yo.

## c) Algo que la IA hizo mal y cómo lo detecté

Al agregar roles, la IA solo añadió el campo  role  al modelo  User  y confió en  sequelize.sync() . Como la tabla  users  ya existía,  sync()  no la modificó y el login fallaba con  Unknown column 'role' . Me di cuenta al ver ese error en la consola del backend. Lo corregí con  addRoleColumnIfMissing()  en  setupDatabase.js , que agrega la columna si falta.
