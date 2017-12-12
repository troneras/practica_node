'use strict';

var i18n = require('i18n');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales:['en', 'es'],

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/../locales',
  
  defaultLocale: 'es',
  
  // sets a custom queryParameter name to parse locale settings from  - defaults to NULL
//   queryParameter: 'lang',
});

// custom errors
module.exports = function CustomError(msg){
    // console.log("Directorio: "+i18n.directory);
    
    if(typeof msg !== 'string'){
        if(msg.errors){
            const mensaje = i18n.__(msg.message);
            const errors = msg.errors;
            for(let i=0 ; i< errors.length; i++){
                errors[i] = i18n.__(errors);
            }
        }
        return {success: false, errors: {message : mensaje, errors: errors}};
    }
    
    return {success:false, errors: i18n.__(message)};
};

