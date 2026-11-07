import { Router } from 'express';
import { getAll, getById, postTecnico, putTecnico, deleteTecnico } from '../controllers/tecnico.controller.js';
import { validateId, validateBody } from '../middlewares/validateTecnico.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tecnicos
 *   description: Gestion de tecnicos
 */

/**
 * @swagger
 * /api/tecnicos:
 *   get:
 *     summary: Listar todos los tecnicos
 *     tags: [Tecnicos]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de tecnicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tecnico'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/tecnicos/{id}:
 *   get:
 *     summary: Obtener un tecnico por id
 *     tags: [Tecnicos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/TecnicoId'
 *     responses:
 *       200:
 *         description: Tecnico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnico'
 *       400:
 *         description: id invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: tecnico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.get('/:id', validateId, getById);

/**
 * @swagger
 * /api/tecnicos:
 *   post:
 *     summary: Crear un tecnico
 *     tags: [Tecnicos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TecnicoInput'
 *     responses:
 *       201:
 *         description: Tecnico creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnico'
 *       400:
 *         description: datos invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       409:
 *         description: email ya registrado para otro tecnico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/', validateBody, postTecnico);

/**
 * @swagger
 * /api/tecnicos/{id}:
 *   put:
 *     summary: Actualizar un tecnico
 *     tags: [Tecnicos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/TecnicoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TecnicoInput'
 *     responses:
 *       200:
 *         description: Tecnico actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnico'
 *       400:
 *         description: id o datos invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: tecnico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       409:
 *         description: email ya registrado para otro tecnico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.put('/:id', validateId, validateBody, putTecnico);

/**
 * @swagger
 * /api/tecnicos/{id}:
 *   delete:
 *     summary: Eliminar un tecnico
 *     tags: [Tecnicos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/TecnicoId'
 *     responses:
 *       204:
 *         description: Tecnico eliminado
 *       400:
 *         description: id invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: tecnico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.delete('/:id', validateId, deleteTecnico);

export default router;
