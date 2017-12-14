'use strict';


/**
 * CustomError
 * Crea una respuesta standar para errores y pone el http status correspondiente 
 * Se encarga de traducir los mensajes de error
 * El fichero con los códigos de error y sus mensajes se encuentra en lib/files/errorCodes
 * 
 * @param {string | express-validator} status 
 * @param {entorno} res 
 * 
 * @returns {success:false, code: ErrorCode, errors: mensaje de error}
 */
module.exports = function CustomError(status,res){
    // cargamos el json con los datos de ejemplo
    const errorCodes = require('./errorCodes.json');
    // Comprobamos si se trata de un error de express validator o un string    
    if(typeof(status) !== 'string'){
        const code = status.message;
        // recorremos los errores de express-validator y traducimos el error
        if(status.errors){
            if(errorCodes[code]){
                const mensaje = res.__(errorCodes[code].msg);
            }else{
                const mensaje = code;
            }
            const errors = status.errors;
            Object.keys(errors).forEach(key => {
                errors[key].msg = res.__(errors[key].msg);
            });
            if(errorCodes[code]){
                res.status(errorCodes[code].status);
            }else{
                res.status(200);
            }
            return {success: false, code:code, errors: {message : mensaje, errors: errors}};
        }
    }
    // Si el error es un string lo devolvemos traducido
    if(errorCodes[status]){
        res.status(errorCodes[status].status);
        return {success:false, code:status, errors: res.__(errorCodes[status].msg)};
    }else{
        res.status(status);
        return {success:false, code:status, errors: status};
    }
};

