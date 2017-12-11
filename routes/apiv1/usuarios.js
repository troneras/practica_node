'use strict';

const express = require('express');
const router  = express.Router();
const {body, validationResult} = require('express-validator/check');
const CustomError = require('../../lib/files/CustomError');
// const jwtAuth = require('../../lib/jwtAuth');
// cargar el modelo de anuncio
const Usuario = require('../../models/Usuario');


/**
 * POST /usuarios
 * Registrar un usuario
 * @param {string} nombre - the name of the user
 * @param {string} email - the email of the user
 * @param {string} clave - the password of the user
 * @returns {boolean} - si el usuario se ha creado
 * @returns {object} - el usuario creado
 */
router.post('/',[
    body('nombre').isAlpha().withMessage('El nombre sólo puede contener letras a-zA-Z'),    
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('clave', 'La clave debe ser de al menos 4 carácteres y contener un número')
    .isLength({ min: 4 })
    .matches(/\d/)

],  (req, res, next) => {
    validationResult(req).throw();
    // creamos un usuario en memoria
    const usuario = new Usuario(req.body);
    
    // lo persistimos en la colección de usuarios
    usuario.save((err, usuarioGuardado) => {
        if(err){
            next(err);
            return;
        }
        res.json({ success: true, result: usuarioGuardado});
    });
});

module.exports = router;