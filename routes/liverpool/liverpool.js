var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload')
router.use(fileUpload({
    limits: {
      fileSize: 1024*1024*50
    },
    abortOnLimit: true
}));


//Constantes de metodos
const { cargaArchivoS, borrarDatosS, leerDatosS, modificarDatosS } = require('./sociedad');
const { cargaArchivoDS, borrarDatosDS, leerDatosDS, modificarDatosDS } = require('./datosSensibles');
const { cargaArchivoD, borrarDatosD, leerDatosD, modificarDatosD } = require('./datos');
const { cargaArchivoU, borrarDatosU, leerDatosU, modificarDatosU } = require('./ubicacion');

//Metodos
router.get('/leerDatosS/:numEmpleado', leerDatosS);
router.get('/leerDatosDS/:numEmpleado', leerDatosDS);
router.get('/leerDatosD/:idSociedad', leerDatosD);
router.get('/leerDatosU/:idUbicacion', leerDatosU);
router.post('cargaArchivoS', cargaArchivoS);
router.post('cargaArchivoDS', cargaArchivoDS);
router.post('cargaArchivoD', cargaArchivoD);
router.post('cargaArchivoU', cargaArchivoU);
router.post('borrarDatosS', borrarDatosS);
router.post('borrarDatosDS', borrarDatosDS);
router.post('borrarDatosD', borrarDatosD);
router.post('borrarDatosU', borrarDatosU);
router.post('modificarDatosS', modificarDatosS);
router.post('modificarDatosDS', modificarDatosDS);
router.post('modificarDatosD', modificarDatosD);
router.post('modificarDatosU', modificarDatosU);

module.exports = router;