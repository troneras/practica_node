'use strict';

const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost', (err, client) => {
    if(err){
        console.log('No se puede conectar');
        process.exit(1);
    }
    const db = client.db('practicanode');

    db.collection('anuncios').drop().catch(err => {/* No importa que no existan */});
    db.collection('usuarios').drop().catch(err => {/* No importa que no existan */});
     

    // Insertamos unos documentos para crear las colecciones  
    db.collection('anuncios').insert(require('./anuncios.json'));
    db.collection('usuarios').insert(require('./usuarios.json'));    

    // Cerramos la conexión a la bbdd
    client.close();

});