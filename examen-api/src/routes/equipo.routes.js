import { Router } from 'express';
import { getAll } from '../controllers/equipo.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Equipos
 *   description: Equipos del laboratorio
 */

/**
 * @swagger
 * /api/equipos:
 *   get:
 *     summary: Listar los equipos del laboratorio
 *     tags: [Equipos]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipo'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', getAll);

export default router;
