const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.render('index.html');
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Server', process.pid, 'listening on port', app.get('port'), 'or 5000');
});


app.get('/login', require('./Autenticate'));
app.post('/login', require('./Autenticate'));

app.get('/Misgrupos', (req, res) => {

    res.sendFile(path.join(__dirname, '/views/consultarGrupos.html'));

});


