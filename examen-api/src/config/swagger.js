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
            description: 'API para registrar incidencias tecnicas en un laboratorio. La sesion se maneja con una cookie httpOnly (haz login primero; el navegador envia la cookie automaticamente).'
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'session'
                }
            },
            schemas: {
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'usuario@correo.com' },
                        password: { type: 'string', minLength: 8, example: '12345678' }
                    }
                },
                RegisterInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'usuario@correo.com' },
                        password: { type: 'string', minLength: 8, example: '12345678' },
                        role: { type: 'string', enum: ['usuario', 'tecnico'], default: 'usuario' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        email: { type: 'string', example: 'usuario@correo.com' },
                        role: { type: 'string', enum: ['usuario', 'tecnico'], example: 'usuario' }
                    }
                },
                Equipo: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'PC-01' },
                        ubicacion: { type: 'string', nullable: true, example: 'Laboratorio A' }
                    }
                },
                IncidenciaInput: {
                    type: 'object',
                    required: ['equipoId', 'descripcion'],
                    properties: {
                        equipoId: { type: 'integer', example: 1 },
                        descripcion: { type: 'string', maxLength: 1000, example: 'No enciende el monitor' }
                    }
                },
                Incidencia: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        descripcion: { type: 'string', example: 'No enciende el monitor' },
                        estado: { type: 'string', enum: ['abierta', 'cerrada'] },
                        equipoId: { type: 'integer', example: 1 },
                        userId: { type: 'integer', example: 1 },
                        cerradaPorId: { type: 'integer', nullable: true },
                        fechaCierre: { type: 'string', format: 'date-time', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                        equipo: { $ref: '#/components/schemas/Equipo' },
                        creador: {
                            type: 'object',
                            properties: { id: { type: 'integer' }, email: { type: 'string' } }
                        },
                        cerradaPor: {
                            type: 'object',
                            nullable: true,
                            properties: { id: { type: 'integer' }, email: { type: 'string' } }
                        }
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
                    description: 'no hay sesion activa, o la sesion es invalida o expiro',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Message' }
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
