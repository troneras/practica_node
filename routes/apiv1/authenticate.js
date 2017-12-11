'use strict';

const express = require('express');
const router  = express.Router();
const {body, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const CustomError = require('../../lib/files/CustomError');

// cargar el modelo de usuario
const Usuario = require('../../models/Usuario');

/**
 * POST /authenticate
 * Autoriza a un usuario y devuelve su JSONWebToken
 * @param {string} email - El email del usuario
 * @param {string} clave - La password del usuario
 * @returns {json} {success : true|false , token:jsonwebtoken }
 */
router.post('/', [
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('clave', 'La clave debe ser de al menos 4 carácteres y contener un número')
    .isLength({ min: 4 })
    .matches(/\d/)
], (req, res, next) => {
    validationResult(req).throw();
    // recogemos las credenciales
    const params = {};
    params.email = req.body.email;
    params.clave = req.body.clave;

    // Buscamos en la base de datos de usuario 
    Usuario.findOne(params, (err, user) => {
        if(err){
            next(err);
        }
        
        if(user === null){
            res.status = 401;
            res.json(CustomError.APIerror('No se ha encontrado un usuario con esos datos'));
            return;
        }
        // Si el usuario existe y la password coincide
        // creamos un token y lo devolvemos
        // no firmar objetos de mongoose, usar mejor un nuevo objeto solo con lo mínimo
        const usuario = { _id : user._id};
        jwt.sign({ user_id: usuario._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if(err){
                next(err);
                return;
            }
    
            // y lo devolvemos
            res.json({ success: true, token: token});
        });
    });    

});

module.exports = router;