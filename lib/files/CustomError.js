'use strict';


// custom errors
module.exports = function CustomError(status,res){
    // cargamos el json con los datos de ejemplo
    const errorCodes = require('./errorCodes.json');
    // Comprobamos si se trata de un error de express validator o un string    
    if(typeof(status) !== 'string'){
        const code = status.message;
        // recorremos los errores de express-validator y traducimos el error
        if(status.errors){
            const mensaje = res.__(errorCodes[code].msg);
            const errors = status.errors;
            Object.keys(errors).forEach(key => {
                errors[key].msg = res.__(errors[key].msg);
            });
            res.status(errorCodes[code].status);
            return {success: false, code:code, errors: {message : mensaje, errors: errors}};
        }
    }
    // Si el error es un string lo devolvemos traducido
    res.status(errorCodes[status].status);
    return {success:false, code:status, errors: res.__(errorCodes[status].msg)};
};

