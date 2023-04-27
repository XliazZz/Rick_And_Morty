const express = require("express");
const {router} = require("./routes/index");
const server = express();

server.use(express.json());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Credentials', 'true');//Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header(//Autorizo recibir solicitudes con dichos hedears
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(//Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use('/rickandmorty', router);

module.exports = server
