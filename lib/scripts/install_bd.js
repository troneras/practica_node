'use strict';

require('dotenv').config();
const { MongoClient } = require('mongodb');

// passwords de los usuarios = 1234
// emails: maria@example.com y antonio@example.com
MongoClient.connect(process.env.DDBB_URL , async (err, client) => {
    if(err){
        console.log('No se puede conectar');
        process.exit(1);
    }
    const db = client.db(process.env.DDBB_NAME);

    await db.collection('anuncios').drop().catch(err => {/* No importa que no existan */});
    await db.collection('usuarios').drop().catch(err => {/* No importa que no existan */});

    // cargamos el json con los datos de ejemplo
    const data = require('./exampleData.json');

    // Insertamos unos documentos para crear las colecciones  
    await db.collection('anuncios').insertMany(data.anuncios).catch(err => {/* No importa que no existan */});;
    await db.collection('usuarios').insertMany(data.usuarios).catch(err => {/* No importa que no existan */});;    

    console.log("OK: BBDD practicanode creada");
    // Cerramos la conexión a la bbdd
    client.close();

});