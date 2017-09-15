//INICIALIZANDO EXPRESS
var express = require('express');
var app = express();
//INICIALIZANDO MODULO DE LEITURA DE ARQUIVO
var fs = require("fs");
//@TODO CRIAR ROTA PARA CADA ID
/*

EX: REPERANDO ROTA PARA RAIZ

app.get('/', function (req, res) {
  
});

CASO DESEJE PASSAR UM PARAMETRO NA ROTA UTILIZAR :


*/
app.get(//SEU CODIGO AQUI
   // PRIMEIRO PASSO LER ARQUIVO
   //@TODO DENTRO DA FUNÇÃO DE CALLBACK LER AQUIVO evolucao.json
   /*
   EX: LENDO ARQUIVO HOSTS NA PASTA ETC
       fs.readFile('/etc/hosts', 'utf8', function (err,data) {

        //TAREFAS PARA SEREM REALIZADAS APÓS A LEITURA DO ARQUIVO

        ################    LEMBRE-SE O NODE É ASSINCRONO      ###########################
            if (err) {
              return console.log(err);
            }
            console.log(data);
          });


   */
   fs.readFile( /*SEU CODIGO AQUI*/, function (err, data) {
      //Transformando os dados lidos em um objeto JSON
       pokemons = JSON.parse( data );
        

        //RECUPERANDO ID
        //@TODO
        /*

          UM OBJETO JSON TAMBÉM PODE SER TRATADO COMO UM ARRAY
          SENDO ASSIM PODEMOS UTILIZAR O MÉTODO FILTER
          O MÉTODO FILTER RECEBE UMA FUNÇÃO CALLBACK E DEVE RETORNAR O ELEMENTO DESEJADO

        */

       /*SEU CODIGO AQUI*/ = pokemons.filter(function(poke){
               //*TODO
               /*
                  
                  o método app.get possui uma função onde o primeiro parâmetro representa a requisição recebida pelo servidor 
                  no exemplo mostrado ele possui o nome de req
                  Esse objeto pode acessar o id através da seguinte chamada
                  req.params.id
                  caso uma requisição 
                  pokedex.com.br/pikachu
                  o valor de req.params.id = pikachu

                  ATENÇÃO 
                   O arquivo JSON está construido da seguinte forma
                   "Name": "wartortle",
                   "Lvl": 100,
                   "Evolution": "Blastoise",
                   "Image": "https://img.pokemondb.net/artwork/wartortle.jpg"

                   PARA DENTRO DA FUNÇÃO FILTER ACESSAR O VALOR DE NAME UTILIZE
                   poke.Name

                   O atributo É CASE SENSITIVE

               */
          });
       
       //RETORNANDO UM JSON 
       res.end( JSON.stringify(/*SEU CODIGO AQUI*/));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})