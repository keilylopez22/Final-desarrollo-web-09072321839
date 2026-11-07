import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { authenticate } from './middlewares/authenticate.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import tecnicoRoutes from './routes/tecnico.routes.js';
import equipoRoutes from './routes/equipo.routes.js';
import incidenciaRoutes from './routes/incidencia.routes.js';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:5173',
    credentials: true // permite que el navegador envie la cookie de sesion
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/tecnicos', authenticate, tecnicoRoutes);
app.use('/api/equipos', authenticate, equipoRoutes);
app.use('/api/incidencias', authenticate, incidenciaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
