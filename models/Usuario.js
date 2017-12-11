'use strict';

const mongoose = require('mongoose');

// primero creamos el esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true, unique: true},
    clave: String    
});

// Creamos un método estático
// anuncioSchema.statics.list = function(filters, limit, skip, sort, fields){
//     const query = Agente.find(filters);
//     // obtenemos la query sin ejecular
//     query.limit(limit);
//     query.skip(skip);
//     query.sort(sort);
//     query.select(fields);
//     // ejecutamos la query y devolvemos una promesa
//     return query.exec();
// };

// y por último creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// y lo exportamos
module.exports = Usuario;