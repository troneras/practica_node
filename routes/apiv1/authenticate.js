'use strict';

const express = require('express');
const router  = express.Router();
const {body, validationResult} = require('express-validator/check');

const CustomError = require('../../lib/files/CustomError');
// cargar el modelo de usuario
const Usuario = require('../../models/Usuario');

/**
 * @api {post} /authenticate Autoriza a un usuario y devuelve su JSONWebToken
 * @apiName Authenticate
 * @apiGroup Authenticate
 * 
 * @apiParam {string} email El email del usuario
 * @apiParam {string} clave La password del usuario
 * 
 * @apiSuccess {boolean} success Si la llamada fue correcta
 * @apiSuccess {string} token Token jwt que deberá usarse en todas las llamadas
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "success": true,
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEyZWI5MzNhOTJjYzhhNjM0ZWZiMDcyIiwiaWF0IjoxNTEzMTYxOTM1LCJleHAiOjE1MTMzMzQ3MzV9.1nL547iBVB9sAFeQdG5hUPWTpvgX1ghdNGuLzocEajc"
 *  }
 * 
 * @apiError InvalidParameters Los parámetros no son correctos
 * 
 * @apiErrorExample
 *  HTTP/1.1 422 Unprocessable entity
 *  {
 *      "success": false,
 *      "code": "InvalidParameters",
 *      "errors": {
 *          "message": "Parámetros no válidos",
 *          "errors": {
 *              "email": {
 *                  "location": "body",
 *                  "param": "email",
 *                  "msg": "El email debe ser válido"
 *             }
 *          }
 *      }
 *  } 
 * 
 * @apiError InvalidCredentials No se ha encontrado un usuario con esas credenciales
 * 
 * @apiErrorExample
 *  HTTP/1.1 401 Not Found
 *  {
 *      "success": false,
 *      "code": "InvalidCredentials",
 *      "errors": "No se ha encontrado un usuario con esos datos"
 *  } 
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
    try{

        // Obtener token del usuario
        Usuario.authenticateUser(params)
        .then(token => {
            res.json({success:true, token: token});
        })
        .catch(err => {
            if(err == 'InvalidEmail'){
                res.status = 401;            
                res.json(new CustomError('InvalidEmail','No existe ningún usuario registrado con ese email',res));
                return;
            }else if(err == 'InvalidPassword'){
                res.status = 401;
                res.json(new CustomError('InvalidPassword','El password es incorrecto',res));
                return;
            }else{
                res.status(500);
                console.log(new Error(err));
                res.json(new CustomError('InternalServerError','Algo va muy mal...',res));
                return;
            }
        }); 
    }catch(err){
        console.log(new Error(err));
    }
});

module.exports = router;