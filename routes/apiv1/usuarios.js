'use strict';

const express = require('express');
const router  = express.Router();
const {body, validationResult} = require('express-validator/check');
const CustomError = require('../../lib/files/CustomError');
// const jwtAuth = require('../../lib/jwtAuth');
// cargar el modelo de anuncio
const Usuario = require('../../models/Usuario');


/**
 * @api {post} /usuarios Registrar un nuevo usuario y devuelve el nuevo usuario creado
 * @apiName CreateUser
 * @apiGroup Usuario
 * 
 * @apiParam {String} nombre  El nombre del usuario
 * @apiParam {String} email  El email del usuario
 * @apiParam {String} clave  La contraseña del usuario
 * @apiPeturns {boolean} - si el usuario se ha creado
 * 
 *  {
 *      "success": true,
 *      "result": {
 *          "__v": 0,
 *          "nombre": "Test",
 *          "email": "test@example.com",
 *          "clave": "12345",
 *          "_id": "5a310feb99e91e8c189d63a0"
 *      }
 *  }
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

    //Registrar al usuario
    Usuario.registerUser(req.body).then(newUser => {
        res.json({ success: true, result: newUser});
        return;
    }).catch(err => {
        if(err == 'DuplicatedEmail'){
            res.status(409); //Conflict
            res.json(new CustomError('DuplicatedEmail','Ya existe un usuario registrado con ese email',res));
            return;
        }else{
            res.status(500);
            res.json(new CustomError('InternalServerError','Algo va muy mal...',res));
            return;
        }
        
    });    

    
});

module.exports = router;