
---
## SOLUCIÓN PRÁCTICA DEVOPS
---
El proyecto está desplegado en: 
[http://devops-kc.westeurope.cloudapp.azure.com/](http://devops-kc.westeurope.cloudapp.azure.com/apidoc/)
El proyecto no tiene ninguna portada así que se muestra la que trae Express por defecto. 

### SOLUCIÓN EJERCICIO 1
Como ejemplo de la parte estática, se puede acceder a la [documentación](http://devops-kc.westeurope.cloudapp.azure.com/apidoc/)
o también se puede consultar alguna de las [imágenes](http://devops-kc.westeurope.cloudapp.azure.com/images/anuncios/bici.jpg)

Para acceder a ficheros no estáticos se pueden hacer llamadas a la api: por ejemplo listar
[anuncios](http://devops-kc.westeurope.cloudapp.azure.com/apiv1/anuncios)

Devolverá un error en formato JSON porque no estás autorizado.

### SOLUCIÓN EJERCICIO 2
La ip del servidor de azure es: [http://13.95.166.81/](http://13.95.166.81/) 
Si se accede a ella se muestra una plantilla bootstrap como se pide. 

Fin solucón práctica DEVOPS.

---
# PRÁCTICA DE NODE Y MONGODB
---
## DOCUMENTACIÓN 
Puede acceder a la documentación de la api desde [apidoc](http://devops-kc.westeurope.cloudapp.azure.com/apidoc/)

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

## Modo normal
Sin salida debug, ni nodemon.

- Se ejecuta utilizando el comando:
```bash
npm run start
```

----
***Autor**: Antonio Blázquez Bea

***Fecha**: 14/12/2017
