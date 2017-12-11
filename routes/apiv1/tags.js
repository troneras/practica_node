'use strict';

const express = require('express');
const router  = express.Router();

// const jwtAuth = require('../../lib/jwtAuth');
// cargar el modelo de anuncio
const Anuncio = require('../../models/Anuncio');


/**
 * GET /anuncios
 * Obtener una lista de tags
 * @returns {json} - {success: true|false, result: [Tags...]}
 */
router.get('/',  async (req, res, next) => {
    try{
        // obtenemos la query sin ejecular
        const query = Anuncio.distinct('tags');
        // // ejecutamos la query y devolvemos una promesa 
        const rows = await query.exec();
        res.json({success : true, result:rows});
    }catch(err){
        next(err);
    }
});

module.exports = router;