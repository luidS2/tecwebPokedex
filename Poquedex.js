var express = require('express');
var app = express();
var fs = require("fs");

app.get('/:id', function (req, res) {
   // First read existing users.
    console.log("entrei");
   fs.readFile( "evolucao.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
        

        //RECUPERANDO ID
       var user = users.filter(function(o){
               return (o.Name === req.params.id);
          });
       

       console.log( user );
       res.end( JSON.stringify(user));
   });
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})