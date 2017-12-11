'use strict';

const express = require('express');
const router  = express.Router();
const {query, validationResult} = require('express-validator/check');
// const jwtAuth = require('../../lib/jwtAuth');
// cargar el modelo de anuncio
const Anuncio = require('../../models/Anuncio');


/**
 * GET /anuncios
 * Obtener una lista de anuncios
 * @param tipo - venta o busqueda
 * @param tag - work, lifestyle, motor y mobile - Pueden enviarse varios separados por espacio
 * @param min - precio mínimo del anuncio
 * @param max - precio máximo del anuncio
 * @param nombre - que empiece por el dato buscado
 * @param limit - limitar el número de anuncios devueltos
 * @param skip - saltar anuncios
 * @returns {json} - {success: true|false, result: [{Anuncios}...]}
 */
router.get('/',[
    query('tipo').optional().isIn(['venta','busqueda']).withMessage('Tipo puede ser venta o busqueda'),
    query('min').optional().isNumeric().withMessage('min es un número'),
    query('max').optional().isNumeric().withMessage('max es un número'),
    query('nombre').optional().matches('^[a-zA-Z0-9_ ]*$').withMessage('El nombre sólo puede contener letras, números y espacios'),
    query('tag').optional().matches('^[a-zA-Z0-9_ ]*$').withMessage('El tag sólo puede contener letras, números y espacios'),
    query('limit').optional().isNumeric().withMessage('limit es un número'),
    query('skip').optional().isNumeric().withMessage('skip es un número')
],  async (req, res, next) => {

    try{
        validationResult(req).throw();
        const tipo = req.query.tipo;
        const precioMin  = parseInt(req.query.min);
        const precioMax  = parseInt(req.query.max);
        const nombre = req.query.nombre;
        const tag = req.query.tag;
        const limit = parseInt(req.query.limit); //Number(str)
        const skip = parseInt(req.query.skip);

        // creo el filtro vacío
        const filter = {};
        if(tipo){            
            filter.venta = tipo === 'venta';
        }
        if(precioMin){
            filter.precio = { $gt : precioMin};
        }
        if(precioMax){
            if(filter.precio){
                filter.precio.$lt = precioMax;
            }else{
                filter.precio = { $lt : precioMax};
            }
        }
        if(nombre){
            filter.$text = { $search: nombre } ;
        }
        if(tag){
            const tags = tag.split(' ');
            filter.tags = { $in : tags};
        }
            
        const rows = await Anuncio.list(filter, limit, skip);
        res.json({success : true, result:rows});
    }catch(err){
        next(err);
    }
});

module.exports = router;