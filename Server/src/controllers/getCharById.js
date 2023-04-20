const axios = require("axios");


const getCharById = (res, id) => {
    axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(respose => respose.data)
    .then( data => {
        let character = {
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin?.name,
            image: data.image,
            status: data.status
        }
        res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(character));
    })
    .catch(err =>
        res.writeHead(500, { "Content-Types": "text/plain" })
        .end("Charater not found"))
};

module.exports = getCharById;