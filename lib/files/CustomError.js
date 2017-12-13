'use strict';


// custom errors
module.exports = function CustomError(msg,res){

    // Comprobamos si se trata de un error de express validator o un string    
    if(typeof msg !== 'string'){
        // recorremos los errores de express-validator y traducimos el error
        if(msg.errors){
            const mensaje = res.__(msg.message);
            const errors = msg.errors;
            Object.keys(errors).forEach(key => {
                errors[key].msg = res.__(errors[key].msg);
            });

            return {success: false, errors: {message : mensaje, errors: errors}};
        }
    }
    // Si el error es un string lo devolvemos traducido
    return {success:false, errors: res.__(msg)};
};

