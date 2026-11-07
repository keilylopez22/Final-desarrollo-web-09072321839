# Imagen de MySQL para la base de datos de examen-api
# Las tablas (users, equipo, incidencia, tecnico) las crea Sequelize al
# arrancar la API, y los datos de prueba se cargan con "npm run seed".
FROM mysql:8.4

# Valores por defecto (coinciden con examen-api/.env).
# Se pueden sobrescribir con -e al ejecutar el contenedor.
ENV MYSQL_ROOT_PASSWORD=admin \
    MYSQL_DATABASE=customers_db \
    TZ=America/Mexico_City

# Configuracion: UTF-8 completo (acentos, ñ, emojis)
COPY my.cnf /etc/mysql/conf.d/my.cnf

EXPOSE 3306

# Docker sabe que la BD esta lista cuando responde a un ping
HEALTHCHECK --interval=5s --timeout=3s --retries=20 \
    CMD mysqladmin ping -h 127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD" --silent || exit 1
