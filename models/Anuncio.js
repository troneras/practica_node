
'use strict';

const mongoose = require('mongoose');

// primero creamos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: { type: String,  index: 'text', unique: true},
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }] }  
});

// Creamos un método estático
anuncioSchema.statics.list = function(filters, limit, skip){
    const query = Anuncio.find(filters);
    // obtenemos la query sin ejecular
    query.limit(limit);
    query.skip(skip);
    
    // ejecutamos la query y devolvemos una promesa
    return query.exec();
};

// y por último creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// y lo exportamos
module.exports = Anuncio;