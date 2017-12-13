'use strict';

const express = require('express');
const router  = express.Router();
const {query, validationResult} = require('express-validator/check');
// const jwtAuth = require('../../lib/jwtAuth');
// cargar el modelo de anuncio
const Anuncio = require('../../models/Anuncio');


/**
 * @api {get} /anuncios Recuperar una lista de anuncios
 * @apiName GetAnuncios
 * @apiGroup Anuncio
 *
 * @apiParam  {String} tipo Buscar por tipo de anuncio: venta o busqueda
 * @apiParam  {String} tag Buscar por tag: work, lifestyle, motor y mobile - Pueden enviarse varios separados por espacio
 * @apiParam  {Number} min Precio mínimo del anuncio
 * @apiParam  {Number} max Precio máximo del anuncio
 * @apiParam  {String} nombre Nombre que empiece por el dato buscado
 * @apiParam  {Number} limit Limitar el número de anuncios devueltos
 * @apiParam  {Number} skip Saltar anuncios
 * 
 * @apiSuccess {boolean} success Si la llamada fue correcta
 * @apiSuccess {array} result Array con los anuncios disponibles
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       result: [
 *           {
 *               _id: "5a2eb933a92cc8a634efb070",
 *               nombre: "iPhone 3GS",
 *               venta: false,
 *               precio: 50,
 *               foto: "images/anuncios/iphone.png",
 *               tags: [
 *                   "lifestyle",
 *                   "mobile"
 *               ]
 *           }
 *       ]
 *   }
 *
 * @apiError InvalidParameters
 * 
 * @apiErrorExample
 *  HTTP/1.1 422 Unprocessable entity
 *  {
 *      success: false,
 *      code: "InvalidParameters",
 *      errors: {
 *          message: "Parámetros no válidos",
 *          errors: {
 *              tipo: {
 *              location: "query",
 *              param: "tipo",
 *              value: "cosa",
 *              msg: "Tipo puede ser venta o busqueda"
 *          }
 *      }
 *  }
 * 
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

/**
 * @api {get} /anuncios/tags Recuperar los tags de anuncios existentes
 * @apiName GetTags
 * @apiGroup Anuncio
 * 
 * @apiSuccess {boolean} success Si la llamada fue correcta
 * @apiSuccess {array} result Array con los tags disponibles
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      success: true,
 *      result: [
 *          "lifestyle",
 *          "motor",
 *          "mobile"
 *      ]
 *  } 
 */
router.get('/tags',  async (req, res, next) => {
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