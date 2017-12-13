'use strict';

const { MongoClient } = require('mongodb');

// passwords de los usuarios = 1234
// emails: maria@example.com y antonio@example.com
MongoClient.connect('mongodb://localhost', (err, client) => {
    if(err){
        console.log('No se puede conectar');
        process.exit(1);
    }
    const db = client.db('practicanode');

    db.collection('anuncios').drop().catch(err => {/* No importa que no existan */});
    db.collection('usuarios').drop().catch(err => {/* No importa que no existan */});

    // cargamos el json con los datos de ejemplo
    const data = require('./exampleData.json');

    // Insertamos unos documentos para crear las colecciones  
    db.collection('anuncios').insertMany(data.anuncios).catch(err => {/* No importa que no existan */});;
    db.collection('usuarios').insertMany(data.usuarios).catch(err => {/* No importa que no existan */});;    

    console.log("OK: BBDD practicanode creada");
    // Cerramos la conexión a la bbdd
    client.close();

});