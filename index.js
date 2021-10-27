const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportlocal = require('passport-local');
const { Passport } = require('passport');
const pool = require('./database');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }));
//configuracion de un secreto
app.use(cookieParser('hola marinin marinin platano'));
app.use(session({
    secret: 'hola marinin marinin platano',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportlocal(async function (username, password, done) {



    if (username.length > 0 && password.length > 0) {
        const identificador = await pool.query('SELECT id_usu FROM musuario WHERE cor_usu = ?', [username]);
        const User = await pool.query('SELECT cor_usu FROM musuario WHERE cor_usu = ?', [username]);
        const pass = await pool.query('SELECT cor_usu FROM musuario WHERE con_usu = ?', [password]);
        const nombre = await pool.query('SELECT nom_usu FROM musuario WHERE cor_usu = ?', [username]);
        const idpass= identificador[0].id_usu;
        const namepass=nombre[0].nom_usu;
        
        if (username == User[0].cor_usu && username == pass[0].cor_usu)

            return done(null, { id:idpass, name: namepass  });
        done(null, false);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);

});

passport.deserializeUser(function (id, done) {
    done(null, {  id:1, name: "no se para que sirve esto pero lo debemos de configurar"  });

});


app.get('/', function (req, res) {
    res.render('index.html');
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Server', process.pid, 'listening on port', app.get('port'), 'or 5000');
});
app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, '/views/iniciarSesion.html'));

});
app.get('/Misgrupos', (req, res) => {

    res.sendFile(path.join(__dirname, '/views/consultarGrupos.html'));

});

app.post('/login', passport.authenticate('local', {
    successRedirect: "/Misgrupos",
    failureRedirect: "/login"
}));
/*
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
*/