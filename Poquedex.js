var express = require('express');
var app = express();
var fs = require("fs");

app.get('/pokedex', function (req, res) {
    var img = fs.readFileSync('./pokedex1.gif');
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get('/', function (req, res) {
    res.redirect("/abra");
})

app.get('/:id', function (req, res) {

    fs.readFile("evolucao.json", 'utf8', function (err, data) {
        users = JSON.parse(data);

        var user = null;
        var ant = null;
        var prox = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].Name === req.params.id) {
                user = users[i];
                if (i > 0)
                    ant = users[(i - 1)].Name;
                if (i < users.length)
                    prox = users[(i + 1)].Name;
                i = users.length;
            }
        }

        if (user === null)
            res.redirect("/abra");
        else
            res.end('<!DOCTYPE html><html><head>' +
                '<style>' +
                'img {position: absolute;top: 25px;left: 25px;}' +
                '.image1{width: 254px;height: 174px;position: absolute;top: 176px;left: 84px;}' +
                '.dados{ position: absolute;top: 191px;left: 504px;}' +
                '.ant{position: absolute;top: 491px;left: 503px;}' +
                '.prox{position: absolute;top: 491px;left: 628px;}' +
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
                '</body></html>');
    });
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})