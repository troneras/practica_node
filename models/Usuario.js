'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// primero creamos el esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true, unique: true},
    clave: { type: String, select: false}    
});

/*
* Registra un usuario
* @params objeto con los campos necesario nombre, email, clave
*
* @success objeto usuario creado
* @error   código del error al guardar
*           - DuplicatedEmail
*           - InternalServerError 
*/
usuarioSchema.statics.registerUser =  function(user){
    return new Promise((resolve, reject) =>{
        // hash de la password
        user.clave = bcrypt.hashSync(user.clave);
        // creamos un usuario en memoria
        const newUser = new Usuario(user);
        // lo persistimos en la colección de usuarios
        newUser.save().then(usuarioCreado => {
            // Devolvemos un objeto usuario sin el password ni el __v             
            usuarioCreado = usuarioCreado.toObject(); // convertir a objeto js normal
            delete usuarioCreado.clave;  
            delete usuarioCreado.__v;
            resolve (usuarioCreado);
        }).catch(err => {
            if(err.code == 11000){
                reject('DuplicatedEmail');
            }else{
                reject (err.code);
            }
        });
    } );
};
  
/**
 *  Autoriza a un usuario y devuelve el token jwt que tiene que utilizar en el resto de peticiones
 * 
 * @param params - objeto con los campos nombre y clave
 * 
 * @success token jwt 
 * 
 * @error InvalidEmail - El email no existe en la BBDD
 * @error InvalidPassword - El password no coincide con el guardado en la BBDD
 */
usuarioSchema.statics.authenticateUser = function(params){

    return new Promise((resolve, reject) =>{

        const queryPromise = Usuario.findOne({email:params.email}).select('+clave').exec();
        queryPromise.then(usuario => {
            if(usuario === null){
                reject('InvalidEmail')
            }
            // Si el usuario existe y la password coincide
            if(bcrypt.compareSync(params.clave, usuario.clave)){
                // creamos un token y lo devolvemos
                // no firmar objetos de mongoose, usar mejor un nuevo objeto solo con lo mínimo
                jwt.sign({ user_id: usuario._id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }, (err, token) => {
                    if(err){
                        reject(err);                        
                    }            
                    // y lo devolvemos
                    resolve(token);                    
                });
            }else{
                reject('InvalidPassword');
            }            
        }).catch(err => {
            reject(err);
        });
    });
}; 

// y por último creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// y lo exportamos
module.exports = Usuario;