/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 19/Septiembre/2022
* @description Script para registro de datos.
*/

var crypto = require("crypto")
var xlsx = require("xlsx");
var md5 = require('blueimp-md5')
var dbLiverprueba = require('../../conexiones/dbMigration').of('liverprueba')

async function cargarDato(dato) {
    return new Promise((resolve, reject) => {
        let query =     `INSERT INTO DATOS_GENERALES(NUM_EMP, NOMBRE, APELLIDO, ID_UBICACION, ID_SOCIEDAD)
                         VALUES (${dato.num_emp}, ${dato.nombre}, ${dato.apellido}, ${dato.id_ubicacion}, ${dato.id_sociedad})`

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
    cargaArchivoD: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivo cargado",
            data: []
        }

        let archivoCSV = req.files.archivo

        let datosArchivo = await ExcelAJSON(archivoCSV)
        datosArchivo = datosArchivo.map(dato => ({
           num_emp: dato.num_emp,
           nombre: dato.nombre,
           apellido: dato.apellido,
           id_ubicacion: dato.id_ubicacion,
           id_sociedad: id.id_sociedad
        }))

        for(const dato in datosArchivo) {
            await cargarDato(dato)
        }

        response.replyCode = 200;
        response.replyText = 'Archivo cargado';
        response.data = [];
        res.status(200).send(response);
    },

    borrarDatosD: async (req, res) => {

        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `DELETE FROM DATOS_GENERALES WHERE NUM_EMP = ${req.body.num_emp}`

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

    leerDatosD: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `SELECT *
                        FROM DATOS_GENERALES`
            
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

    modificarDatosD: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `UPDATE DATOS_SENSIBLES 
                        SET NOMBRE = ${req.body.nombre}, APELLIDO = ${req.body.apellido}, ID_UBICACION = ${req.body.id_ubicacion}, ID_SOCIEDAD = ${req.body.id_sociedad}
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