# Instrucciones para el examen

una aplicacion web para registrar incidencias tecnicas en un laboratorio .

**stack ocligatorio:** node js+sequelize(BD eleccion) reack en el frontend y sesion mediante cookies

## Requisitos

- login de usuario con sesion en cookie deben existir dos roles: **usuario** y **tecnico**
- listado de equipos y formulario para regstrar una incidencia (equipo y descripcion)

> **Regla:** una incidencia solo puede cerrarla el usuario que la registro o un usuario con el rol tecnico.
> La sesion debe distinguir el rol y el endpoint de cierre debe verificarlo el backend

## Entregables

1. El codigo en un rpositorio con al menos dos commits : uno tras el backen y otro tras el frontend .
2. un archivo `decisiones.md` con tres secciones:
   - **a)** que enrtendio del problema y que tablas/modelos planeo
   - **b)** que partes se le delegaron a la ia y porque
   - **c)** al menos una cosa que la IA hizo mal o que tuvo que corregir, y como se dio cuenta.
3. archico `prompts.md` donde se indican los prompts solicitados
