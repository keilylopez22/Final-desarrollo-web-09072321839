import express from 'express';
import swaggerUi from 'swagger-ui-express';
import tecnicoRoutes from './routes/tecnico.routes.js';
import { swaggerSpec } from './config/swagger.js';
import authRoutes from './routes/auth.routes.js';
import { authenticate } from './middlewares/authenticate.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(',')??'http://localhost:5173'
}))
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/tecnicos', authenticate, tecnicoRoutes);
app.use ('/api/auth', authRoutes);

export default app;
