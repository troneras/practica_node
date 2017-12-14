# PRÁCTICA DE NODE Y MONGODB
---
## DOCUMENTACIÓN 
Puede acceder a la documentación de la api desde [apidoc](http://localhost:3000/apidoc)

## Despliegue 
1. Configurar las variables de entorno:
- Copiar el fichero **.env.example** a **.env** y modificar las variables de entorno 
2. Instalar librerías y dependencias
```bash
npm install
```
## Arrancar servidor
La aplicación arrancará un proceso servidor y conectará con el servidor de la BBDD

- Primero crear un directorio si no existe **\data\db** dónde se guardarán las BBDD de *mongoDB*
- Luego ir al directorio dónde está instalado *mongoDB* y arrancar *mongoDB* ejecutando:
```bash
.\bin\mongod --dbpath <\data\db> --directoryperdb
```
## Cargar BBDD con datos de prueba
La aplicación permite cargar unos datos de prueba en la BBDD para tener usuario y anuncios de test.

-Para generar la BBDD de prueba ejecutar:
```bash
npm run installDB
```

## Modo cluster
El modo cluster permite al servidor lanzar tantos procesos como cores tiene la CPU de la máquina para poder procesar el mayor número de peticiones posible.
 
- Para ejecutar el servidor en modo cluster debemos ejecutar el comando:
```bash
npm run cluster
```
## Modo desarrollo 
El modo desarrollo permite arrancar el servidor con la salida de errores por consola y utilizando nodemon.

- Se ejecuta utilizando el comando:
```bash
npm run dev
```
----
***Autor**: Antonio Blázquez Bea

***Fecha**: 14/12/2017
