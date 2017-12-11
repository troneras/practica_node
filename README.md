# PRÁCTICA DE NODE Y MONGODB

- Empezamos creando un repositorio git en una carpeta vacía. Después generamos el package.json usando 

npm install --y

- Después generamos la estructura de una aplicación express e instalamos los módulos 

express . --ejs
npm install

- Incluímos en el comando start de npm las variables para modificar el modo de arranque en desarrollo, con el log debug activado y nodemon

"dev": "cross-env DEBUG=practica:* nodemon ./bin/www"

Se ejecuta utilizando el comando:

npm run dev

- Configuramos el view engine para que podamos editar ficheros html en las vistas usando el motor de plantillas ejs
- Configuramos express-validator y modificamos el output de errores en app.js

- Instalación de mongoDB