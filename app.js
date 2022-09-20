var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
var cors = require('cors')
var proxy = require('express-http-proxy');

//Rutas 
var liverpoolprueba = require('./routes/liverpool/liverpool')

//Uso de rutas
var app = express();
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize())

app.use('/liverpoolprueba', liverpoolprueba);

module.exports = app;