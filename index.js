const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.render('index.html');
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', app.get('port'), 'or 5000');
});

module.exports = app;

//Conexion con mysql
var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'superbear',
    user : 'root',
    password : 'maika',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});


conexion.end();
