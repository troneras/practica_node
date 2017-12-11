'use strict';

// custom errors
module.exports.APIerror = function(msg){
    return {success:false, errors: msg};
};

