import { Router } from 'express';
import { getAll, postIncidencia, cerrarIncidencia } from '../controllers/incidencia.controller.js';
import { validateId, validateBody } from '../middlewares/validateIncidencia.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Incidencias
 *   description: Incidencias tecnicas del laboratorio
 */

/**
 * @swagger
 * /api/incidencias:
 *   get:
 *     summary: Listar las incidencias
 *     tags: [Incidencias]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de incidencias (mas recientes primero)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incidencia'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/incidencias:
 *   post:
 *     summary: Registrar una incidencia (el creador es el usuario de la sesion)
 *     tags: [Incidencias]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidenciaInput'
 *     responses:
 *       201:
 *         description: Incidencia registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incidencia'
 *       400:
 *         description: datos invalidos o el equipo no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/', validateBody, postIncidencia);

/**
 * @swagger
 * /api/incidencias/{id}/cerrar:
 *   patch:
 *     summary: Cerrar una incidencia
 *     description: Solo puede cerrarla el usuario que la registro o un usuario con rol tecnico. Lo verifica el backend con la sesion.
 *     tags: [Incidencias]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Incidencia cerrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incidencia'
 *       400:
 *         description: id invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         description: el usuario no es el creador ni tiene rol tecnico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: incidencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       409:
 *         description: la incidencia ya esta cerrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.patch('/:id/cerrar', validateId, cerrarIncidencia);

export default router;
