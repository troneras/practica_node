'use strict';

const jwt = require('jsonwebtoken');
const CustomError = require('./files/CustomError');
// exportamos un creador de middlewares de autenticación
module.exports = () => {
    return function(req,res,next){
        //leer credenciales
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if(!token){
            const error = new Error('NoTokenProvided');
            error.status = 401;
            next(error);
            return;
        }

        // comprobar credenciales
        jwt.verify( token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                const error = new Error('InvalidToken');
                error.status = 401;
                next(error);
                return;
            }

            // continuar
            req.userID = decoded.user_id; // lo mismo que metimos en encode
            next();
        } );


    };
};



