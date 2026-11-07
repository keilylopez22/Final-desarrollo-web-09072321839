import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Examen API',
            version: '1.0.0',
            description: 'API CRUD de tecnicos'
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                AuthInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'usuario@correo.com' },
                        password: { type: 'string', minLength: 8, example: '12345678' }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        tokentype: { type: 'string', example: 'Bearer' },
                        expiresIn: { type: 'string', example: '1h' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        email: { type: 'string', example: 'usuario@correo.com' }
                    }
                },
                AuthMessage: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                Tecnico: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Juan Perez' },
                        especialidad: { type: 'string', nullable: true, example: 'Redes' },
                        telefono: { type: 'string', nullable: true, example: '5551234567' },
                        email: { type: 'string', nullable: true, example: 'juan@correo.com' }
                    }
                },
                TecnicoInput: {
                    type: 'object',
                    required: ['nombre'],
                    properties: {
                        nombre: { type: 'string', maxLength: 100, example: 'Juan Perez' },
                        especialidad: { type: 'string', maxLength: 100, nullable: true, example: 'Redes' },
                        telefono: { type: 'string', maxLength: 20, nullable: true, example: '5551234567' },
                        email: { type: 'string', format: 'email', maxLength: 150, nullable: true, example: 'juan@correo.com' }
                    }
                },
                Message: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'datos invalidos' },
                        errors: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
            responses: {
                Unauthorized: {
                    description: 'token no proporcionado, invalido o expirado',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthMessage' }
                        }
                    }
                }
            },
            parameters: {
                TecnicoId: {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID del tecnico (entero positivo)',
                    schema: { type: 'integer', minimum: 1 }
                }
            }
        }
    },
    apis: [path.join(__dirname, '../routes/*.js').replace(/\\/g, '/')]
});
