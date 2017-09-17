var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/pokedex', function (req, res) {
    var img = fs.readFileSync('./pokedex1.gif');
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get('/', function (req, res) {
    res.redirect("/abra");
})

app.get('/:id', function (req, res) {
    console.log(req.params.id);
    fs.readFile("evolucao.json", 'utf8', function (err, data) {
        users = JSON.parse(data);

        var user = null;
        var ant = null;
        var prox = null;
	var go = null;    
        for (var i = 0; i < users.length; i++) {
            if (users[i].Name === req.params.id) {
                user = users[i];
		go = user.Evolution.toLowerCase();
                if (i > 0)
                    ant = users[(i - 1)].Name;
                if (i < users.length)
                    prox = users[(i + 1)].Name;
                i = users.length;
            }
        }
        console.log(user);
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
		'<a href= ' + go + '>GoToEvolution</a>' +
                '</div>' +
                '</body></html>');
                
    });
    console.log("deu");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
