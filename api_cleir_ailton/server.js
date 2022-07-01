
//Definindo as variáveis

const http = require('http')
/*
Declarar esta variável significa permitir que o módulo integrado
do Node JS transfira dados pelo HyperText Transfer Protocol
(Protocolo de Transferência de HiperTexto). O nosso conhecido
HTTP.
*/
const fs = require('fs')
/*
FS (File System): trata-se de um módulo do sistema de arquivos 
do Node.js que permite trabalhar com o sistema
 de arquivos em seu computador.
 */
const path = require('path')
/*
Path: "caminho", significando que as rotas
 da aplicação serão estabelecidas por meio dela.
*/
const data = require('./urls.json')
/*
Data: contém o arquivo JSON com os sites e urls favoritos.
*/
const URL = require('url')

/*
Configurando o servidor para ser disponibilizado
na porta 3000
RES: abreviatura de response
RQ: abreviatura de require

O módulo http está criando um servidor http para 
dar as respostas que o cliente precisar.
*/
http.createServer((req, res) => {

    const {name, url, del} = URL.parse(req.url,true).query
    
    if(!name || !url){
        return res.end(JSON.stringify(data))/*finalizando a resposta 
        para o cliente. Nesse caso, o arquivo JSON.*/
    }
    //Deletando um item JSON
    if(del){
        data.urls = data.urls.filter(item=> item.url != url)
        return writeFile(message => res.end(message))
    }
    
/*Atualizando o arquivo JSON*/
   data.urls.push({"name":name, "url":url})
   return writeFile(message => res.end(message))


    function writeFile(cp){
        fs.writeFile(path.join(__dirname, 'urls.json'),
        /* fs.writeFile: usado para gravar de forma assíncrona
         os dados especificados em um arquivo. */
        JSON.stringify(data,null,2),
        err =>{
            if(err) throw err
            cp('operação realizada com sucesso')
        })
    }

}).listen(3000, () => { console.log('api is running') })
/*
Permitindo que a página rode no navegador
por meio da porta 3000.
*/
