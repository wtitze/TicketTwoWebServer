var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

var Client = require('node-rest-client').Client;
var client = new Client();

app.get('/', function (req, res) {
    res.render('home', {message: 'Inserisci le informazioni richieste', title:'CRUD'});  
});

app.get('/prenota', function (req, res) {
   
    var args = {
        data: {
            data : req.query.data,
            fila : req.query.fila,
            poltrona : req.query.poltrona
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://node28.codenvy.io:44880/prenota", args, function (data, response) {
      if (data.result == 'ok')
        res.render('risposta', {message: 'La prenotazione è stata effettuata con successo. Numero della prenotazione:' + data.numeroPrenotazione});
      else
        res.render('risposta', {message: 'Problemi nell\'inserimento'});
    });
    
});

app.get('/cancella', function(req, res){
    var args = {};
    client.delete("http://node28.codenvy.io:44880/cancella/"+ req.query.n, args, function (data, response) {
      if (data.result == 'ok')
        res.render('risposta', {message: 'La prenotazione ' + req.query.n + ' è stata cancellata con successo.'});
      else
        res.render('risposta', {message: 'Problemi nell\'inserimento'});
    });  
});

app.get('/modifica', function(req, res){
    // scrivere qui il codice per effettuare la modifica di una prenotazione
});

app.get('/lista', function(req, res){
  var args = {};
  client.get("http://node28.codenvy.io:44880/lista", args, function (data, response) {
    res.render('elenco', {message: 'elenco delle prenotazioni effettuate', list: data});
  }); 
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

