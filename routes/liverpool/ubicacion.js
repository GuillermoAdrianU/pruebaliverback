/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 19/Septiembre/2022
* @description Script para registro de datos.
*/

var xlsx = require("xlsx");
var md5 = require('blueimp-md5')
var dbLiverprueba = require('../../conexiones/dbMigration').of('liverprueba')

async function cargarDato(dato) {
    return new Promise((resolve, reject) => {
        let query =     `INSERT INTO UBICACION(ID_UBICACION, DESCRIPCION)
                         VALUES (${dato.id_ubicacion}, ${dato.descripcion})`

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
    cargaArchivoU: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivo cargado",
            data: []
        }

        let archivoCSV = req.files.archivo

        let datosArchivo = await ExcelAJSON(archivoCSV)
        datosArchivo = datosArchivo.map(dato => ({
           id_ubicacion: dato.id_ubicacion,
           descripcion: dato.descripcion 
        }))

        for(const dato in datosArchivo) {
            await cargarDato(dato)
        }

        response.replyCode = 200;
        response.replyText = 'Archivo cargado';
        response.data = [];
        res.status(200).send(response);
    },

    borrarDatosU: async (req, res) => {

        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `DELETE FROM UBICACION WHERE NUM_EMP = ${req.body.id_ubicacion}`

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

    leerDatosU: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `SELECT *
                        FROM UBICACION`
            
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

    modificarDatosU: async (req, res) => {
        if(!f.definido(num_emp)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let query = `UPDATE DATOS_SENSIBLES 
                        SET DESCRIPCION = ${req.body.descripcion}
                        WHERE ID_UBICACION = ${req.body.id_ubicacion}`

            dbLiverprueba.exce(query, async (err, data) => {
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