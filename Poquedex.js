var express = require('express');
var app = express();
var debug = require('debug')('tecnologias-web:server');
var http = require('http');
var fs = require("fs");

app.get('/pokedex', function (req, res) {
    var img = fs.readFileSync('./pokedex1.gif');
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get('/', function (req, res) {
    res.redirect("/charmander");
})

app.get('/:id', function (req, res) {

    fs.readFile("evolucao.json", 'utf8', function (err, data) {
        users = JSON.parse(data);

        var user = null;
        var ant = null;
        var prox = null;
		var go=null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].Name === req.params.id) {
				go = user.Evolution.toLowerCase();
                user = users[i];
                if (i > 0)
                    ant = users[(i - 1)].Name;
                if (i < users.length)
                    prox = users[(i + 1)].Name;
                i = users.length;
            }
        }
        console.log(user);
        if (user === null)
            res.redirect("/charmander");
        else
            res.end('<!DOCTYPE html><html><head>' +
                '<style>' +
                'img {position: absolute;top: 25px;left: 25px;}' +
                '.image1{width: 254px;height: 174px;position: absolute;top: 176px;left: 84px;}' +
                '.dados{ position: absolute;top: 191px;left: 504px;}' +
                '.ant{position: absolute;top: 491px;left: 503px;}' +
                '.prox{position: absolute;top: 491px;left: 628px;}' +
				'.go{position: absolute;top: 491px;left: 125px;}' +
                '</style>' +
                '<link rel="stylesheet" type="text/css" href="index.css">' +
                '</head><body><div>' +
                '<img class="image1" src="' + user.Image + '" />' +
                '<img class="image2" src="pokedex" /></div>' +
                '<div class="dados">' +
                'Nome: ' + user.Name +
                '<br>' +
                'Lvl: ' + user.Lvl +
                '<br>' +
                'Evolution: ' + user.Evolution +
                '</div>' +
                '<div class="ant">' +
                '<a href= ' + ant + '>Anterior</a>' +
                '</div>' +
                '<div class="prox">' +
                '<a href= ' + prox + '>Proximo</a>' +
                '</div>' +
				'<div class="go">' +
                '<a href= ' + go + '>GoToEvolution</a>' +
                '</div>' +
                '</body></html>');
    });
})
/*
var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})*/

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
