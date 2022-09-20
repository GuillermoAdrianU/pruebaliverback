/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 19/Septiembre/2022
* @description Script para registro de datos.
*/

var f = require('../../funciones');
var xlsx = require("xlsx");
var md5 = require('blueimp-md5')
var dbLiverprueba = require('../../conexiones/dbMigration').of('liverprueba')

async function cargarDato(dato) {
    return new Promise((resolve, reject) => {
        let query =     `INSERT INTO DATOS_SENSIBLES(NUM_EMP, DIRECCION, CUENTA_BANCARIA, TELEFONO)
                         VALUES (${dato.num_emp}, ${dato.direccion}, ${dato.cuenta_bancaria}, ${dato.telefono})`

        dbLiverprueba.query(query, async (err, data) => {
            if(err){
                console.log(err)
                response.replyCode = 500;
                response.replyText = 'Error en la solicitud de datos';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                resolve(true)
            }
        })                
    })
}

module.exports = {
    cargaArchivoDS: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivo cargado",
            data: []
        }

        let archivoCSV = req.files.archivo

        let datosArchivo = await ExcelAJSON(archivoCSV)
        datosArchivo = datosArchivo.map(dato => ({
           num_emp: Buffer.from(dato.num_emp, 'base64'),
           direccion: Buffer.from(dato.direccion, 'base64'),
           cuenta_bancaria: Buffer.from(dato.cuenta_bancaria, 'base64'),
           telefono: Buffer.from(dato.telefono, 'base64'),
        }))

        for(const dato in datosArchivo) {
            await cargarDato(dato)
        }

        response.replyCode = 200;
        response.replyText = 'Archivo cargado';
        response.data = [];
        res.status(200).send(response);
    },

    borrarDatosDS: async (req, res) => {

        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `DELETE FROM DATOS_SENSIBLES WHERE NUM_EMP = ${req.body.num_emp}`

            dbLiverprueba.query(query, async (err, data) => {
                if(err){
                    response.replyCode = 500;
                    response.replyText = 'Error en la solicitud de datos';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    response.replyCode = 200;
                    response.replyText = 'Exito en la solicitud';
                    response.data = [data];
                    res.status(200).send(response);
                }
            })
        }
    },

    leerDatosDS: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `SELECT *
                        FROM DATOS_SENSIBLES`
            
            dbLiverprueba.query(query, async (err, data) => {
                if(err){
                    response.replyCode = 500;
                    response.replyText = 'Error en la solicitud de datos';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    response.replyCode = 200;
                    response.replyText = 'Exito en la solicitud';
                    response.data = [data];
                    res.status(200).send(response);
                }
            })
        }
    },

    modificarDatosDS: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `UPDATE DATOS_SENSIBLES 
                        SET DIRECCION = ${req.body.direccion}, CUENTA_BANCARIA = ${req.body.cuenta_bancaria}, TELEFONO = ${req.body.telefono}
                        WHERE NUM_EMP = ${req.body.num_emp}`

            dbLiverprueba.query(query, async (err, data) => {
                if(err){
                    response.replyCode = 500;
                    response.replyText = 'Error en la solicitud de datos';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    response.replyCode = 200;
                    response.replyText = 'Exito en la solicitud';
                    response.data = [data];
                    res.status(200).send(response);
                }
            })
        }
    }
}