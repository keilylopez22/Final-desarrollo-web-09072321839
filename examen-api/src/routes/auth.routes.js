import { register, login, logout, me } from '../controllers/auth.controller.js';
import { Router } from 'express';
import { validateLogin, valiteRegister } from '../middlewares/validateAuth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registro, login (sesion en cookie) y usuario autenticado
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesion. La sesion se guarda en una cookie httpOnly llamada "session"
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login exitoso (se envia el header Set-Cookie)
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: session=eyJhbGciOi...; Path=/; HttpOnly; SameSite=Lax
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: email y password son obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         description: credenciales invalidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/login', validateLogin, login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario (rol usuario o tecnico)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: datos invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: email ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/register', valiteRegister, register);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesion (borra la cookie)
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Sesion cerrada
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener el usuario de la sesion actual
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me', authenticate, me);

export default router;
