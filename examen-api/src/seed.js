// Inserta datos de prueba para probar toda la aplicacion.
// Uso:  npm run seed
// Se puede ejecutar varias veces: no duplica usuarios ni equipos, y las
// incidencias de los usuarios de prueba se borran y se vuelven a crear.
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { setupDatabase } from './config/setupDatabase.js';
import { sequelize, User, Equipo, Incidencia, Tecnico } from './models/index.js';

const PASSWORD = '12345678'; // misma contraseña para todos los usuarios de prueba

const USUARIOS = [
    { email: 'ana@lab.com', role: 'usuario' },
    { email: 'beto@lab.com', role: 'usuario' },
    { email: 'carla@lab.com', role: 'usuario' },
    { email: 'tecnico@lab.com', role: 'tecnico' },
    { email: 'soporte@lab.com', role: 'tecnico' },
];

const EQUIPOS = [
    { nombre: 'PC-01', ubicacion: 'Laboratorio A' },
    { nombre: 'PC-02', ubicacion: 'Laboratorio A' },
    { nombre: 'PC-03', ubicacion: 'Laboratorio B' },
    { nombre: 'PC-04', ubicacion: 'Laboratorio B' },
    { nombre: 'Impresora HP', ubicacion: 'Laboratorio B' },
    { nombre: 'Proyector Epson', ubicacion: 'Laboratorio C' },
    { nombre: 'Switch Cisco', ubicacion: 'Cuarto de redes' },
];

// creador / cerradaPor = email, equipo = nombre
const INCIDENCIAS = [
    { creador: 'ana@lab.com', equipo: 'PC-01', descripcion: 'El monitor no enciende.' },
    { creador: 'ana@lab.com', equipo: 'Impresora HP', descripcion: 'La impresora atasca el papel en cada impresion.' },
    { creador: 'beto@lab.com', equipo: 'PC-02', descripcion: 'El teclado tiene varias teclas que no responden.' },
    { creador: 'beto@lab.com', equipo: 'Proyector Epson', descripcion: 'La imagen se ve con tono amarillo.' },
    { creador: 'carla@lab.com', equipo: 'PC-03', descripcion: 'No hay conexion a internet.' },
    { creador: 'carla@lab.com', equipo: 'Switch Cisco', descripcion: 'Luces del puerto 12 parpadean en naranja.' },
    // cerradas
    { creador: 'ana@lab.com', equipo: 'PC-04', descripcion: 'El mouse no funciona.', cerradaPor: 'ana@lab.com' },
    { creador: 'beto@lab.com', equipo: 'PC-01', descripcion: 'Windows pide actualizacion y no arranca.', cerradaPor: 'tecnico@lab.com' },
    { creador: 'carla@lab.com', equipo: 'Impresora HP', descripcion: 'Sin toner negro.', cerradaPor: 'soporte@lab.com' },
];

const TECNICOS = [
    { nombre: 'Luis Martinez', especialidad: 'Redes', telefono: '5551000001', email: 'luis.martinez@lab.com' },
    { nombre: 'Maria Gomez', especialidad: 'Hardware', telefono: '5551000002', email: 'maria.gomez@lab.com' },
    { nombre: 'Jorge Ramirez', especialidad: 'Software', telefono: '5551000003', email: 'jorge.ramirez@lab.com' },
];

async function seed() {
    await setupDatabase(); // crea tablas / columna role si hace falta

    const passwordHash = await bcrypt.hash(PASSWORD, 10);
    const users = {};
    for (const { email, role } of USUARIOS) {
        const [user] = await User.findOrCreate({
            where: { email },
            defaults: { password_hash: passwordHash, role },
        });
        await user.update({ password_hash: passwordHash, role }); // por si ya existia con otros datos
        users[email] = user;
    }

    const equipos = {};
    for (const { nombre, ubicacion } of EQUIPOS) {
        const [equipo] = await Equipo.findOrCreate({ where: { nombre }, defaults: { ubicacion } });
        equipos[nombre] = equipo;
    }

    for (const { email, ...datos } of TECNICOS) {
        await Tecnico.findOrCreate({ where: { email }, defaults: datos });
    }

    // Reinicia solo las incidencias de los usuarios de prueba
    await Incidencia.destroy({ where: { userId: Object.values(users).map((u) => u.id) } });
    for (const inc of INCIDENCIAS) {
        const cerrada = Boolean(inc.cerradaPor);
        await Incidencia.create({
            equipoId: equipos[inc.equipo].id,
            userId: users[inc.creador].id,
            descripcion: inc.descripcion,
            estado: cerrada ? 'cerrada' : 'abierta',
            cerradaPorId: cerrada ? users[inc.cerradaPor].id : null,
            fechaCierre: cerrada ? new Date() : null,
        });
    }

    console.log('\nSeed completado. Usuarios de prueba (password: ' + PASSWORD + '):');
    console.table(USUARIOS);
    console.log(`${EQUIPOS.length} equipos, ${INCIDENCIAS.length} incidencias (${INCIDENCIAS.filter((i) => i.cerradaPor).length} cerradas), ${TECNICOS.length} registros en tabla tecnico.`);
}

try {
    await seed();
} catch (error) {
    console.error('error en el seed:', error);
    process.exitCode = 1;
} finally {
    await sequelize.close();
}
