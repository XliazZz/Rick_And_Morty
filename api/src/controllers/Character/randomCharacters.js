const axios = require('axios');

const BASE_URL = "https://rickandmortyapi.com/api/character";

const getRandomCharacters = async (numCharacters) => {
    try {
        const totalPages = await getTotalPages();
        const randomCharacters = new Set();

        while (randomCharacters.size < numCharacters) {
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            const characters = await getCharactersByPage(randomPage);

            for (const character of characters) {
                randomCharacters.add(character);
                if (randomCharacters.size === numCharacters) {
                    break;
                }
            }
        }

        return Array.from(randomCharacters);
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getTotalPages = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.info.pages;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

const getCharactersByPage = async (page) => {
    try {
        const response = await axios.get(`${BASE_URL}?page=${page}`);
        return response.data.results;
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
