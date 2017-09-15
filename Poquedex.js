var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('pokedex1.gif'));

app.get('/pokedex', function (req, res) {
    var img = fs.readFileSync('./pokedex1.gif');
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get('/:id', function (req, res) {
    // First read existing users.
    console.log("entrei");
    fs.readFile("evolucao.json", 'utf8', function (err, data) {
        users = JSON.parse(data);


        //RECUPERANDO ID
        var user = users.filter(function (o) {
            return (o.Name === req.params.id);
        });

        console.log(user);
        res.end('<!DOCTYPE html><html><head>' +
            '<style>img {position: absolute;top: 25px;left: 25px;}.image1{width: 254px;height: 174px;position: absolute;top: 176px;left: 84px;}</style>' +
            '<link rel="stylesheet" type="text/css" href="index.css">' +
            '</head><body><div>' +
            '<img class="image1" src="' + user[0].Image + '" />' +
                '<img class="image2" src="pokedex" /></div></body></html>');
    });
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})