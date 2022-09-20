var mysql = require('mysql');

let liverprueba = {
  host     : 'localhost',
  port     : '3306',
  user     : 'admin',
  password : 'admin',
  database:  'liverpoolprueba',
  multipleStatements: true
};

var poolCluster = mysql.createPoolCluster();
poolCluster.add('liverprueba', liverprueba);


module.exports = poolCluster;