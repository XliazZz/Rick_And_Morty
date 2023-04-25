const axios = require('axios');

const URL = "https://rickandmortyapi.com/api/character?page=2";

const getRandomCharacters = async (numCharacters) => {
    try {
        const response = await axios.get(URL);
        const characters = response.data.results;
        const randomCharacters = [];
        while (randomCharacters.length < numCharacters) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCharacters.push(characters[randomIndex]);
        }
        return randomCharacters;
    } catch (error) {
        console.error(error);
        return [];
    }
    };

    const sendRandomCharacters = async (req, res) => {
    try {
        const numCharacters = 4;
        const randomCharacters = await getRandomCharacters(numCharacters);
        if (randomCharacters.length > 0) {
        res.status(200).send(randomCharacters);
        } else {
        res.status(404).send('No se encontraron personajes');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los personajes');
    }
    };

    module.exports = {
    getRandomCharacters,
    sendRandomCharacters
};
