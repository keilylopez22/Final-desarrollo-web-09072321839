import 'dotenv/config';
import app from './app.js';
import { testConnection } from './config/db.js';
import { setupDatabase } from './config/setupDatabase.js';

if(!process.env.JWT_SECRET || process.env.JWT_SECRET.length<32){
    console.error('no se encontro jwt secret');
    process.exit(1);
}
const PORT= process.env.PORT||3000;

try {
    await testConnection();
    await setupDatabase();
    app.listen(PORT,()=>{
        console.log(`servidor iniciado en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('no se pudo iniciar el servidor:', error.message);
    process.exit(1);
}
