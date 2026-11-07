# Prompts

## Base de datos

1. "Levanta MySQL en Docker con contraseña de root `admin` y un volumen para guardar los datos."
2. "Crea la base de datos ."

## API (Node.js)

3. "Haz una API con Express y Sequelize para reportar fallas de equipos del laboratorio. Login con cookie y dos roles: `usuario` y `tecnico`."
4. "Agrega un endpoint para cerrar una incidencia. Solo puede cerrarla quien la creó o un técnico. El backend lo debe validar."
5. "Documenta la API con Swagger."
6. "Haz un seeder con usuarios de los dos roles, algunos equipos e incidencias de prueba."

## Frontend (React)

7. "Crea un proyecto de React con Vite y React Router."
8. "Haz un cliente HTTP que mande la cookie en cada petición (`credentials: 'include'`) y muestre el mensaje de error que devuelve la API."
9. "Separa las llamadas a la API por archivo: auth, equipos, incidencias y técnicos."
10. "Crea un contexto de autenticación con un hook `useAuth` que guarde el usuario, y tenga `login`, `logout` y revise la sesión al cargar la página."
11. "Haz un componente `ProtectedRoute` que mande al login si no hay sesión."
12. "Crea componentes reutilizables: `Button`, `Input` y `Alert`."
13. "Haz la página de login y la de registro, con validación básica y mensajes de error."
14. "Haz la página de incidencias: lista de equipos, formulario para reportar una falla y lista de incidencias."
15. "Muestra el botón para cerrar una incidencia solo si el usuario la creó o es técnico, y actualiza la lista al cerrarla."
16. "Agrega estados de carga y mensajes cuando no hay datos o algo falla."
17. "Dale un estilo simple y que se vea bien en celular."
