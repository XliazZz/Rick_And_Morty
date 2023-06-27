const axios = require('axios');
const { Character, Episode } = require('../db.js');

const getApiData = async () => {

    try {
        let i = 1;
        let characters = []; 

        while(i < 43){
            let apiData = await axios(`https://rickandmortyapi.com/api/character?page=${i}`);

            characters.push(apiData);

            i++;
        }

        characters = (await Promise.all(characters)).map(res => res.data.results.map(char => {
            return ({
                id: char.id,
                name: char.name,
                status: char.status,
                species: char.species,
                gender: char.gender,
                origin: char.origin.name,
                image: char.image,
                location: char.location.name,
            })
        }))

        //concatenamos a los personajes porque estaban en un array dentro del array.
        let allCharacters = [];
        characters.map(char => { allCharacters = allCharacters.concat(char) })

        return allCharacters;

    } catch (error) {
        return { error: error.message }
    }

};

const getEpisodes = async () => {
    try {
        let i = 1;
        let episodes = [];

        while (i < 4) {
            let apiEpisode = await axios(`https://rickandmortyapi.com/api/episode?page=${i}`);

            episodes.push(apiEpisode);

            i++;
        }

        episodes = (await Promise.all(episodes)).map(res => res.data.results.map(epi => {
            return ({
                id: epi.id,
                name: epi.name,
                air_date: epi.air_date,
                episode: epi.episode,
                characters: epi.characters,
            })
        }))

        let allEpisodes = [];
        episodes.map(epi => { allEpisodes = allEpisodes.concat(epi) })

        return allEpisodes;

    } catch (error) {
        return { error: error.message }
    }
}

const saveApiData = async () => {
    try {
        const allCharacters = await getApiData();
        
        await Character.bulkCreate(allCharacters)
        //bulkCreate nos permite pasarle un array de objeto y los crea todos jutnos en la DB

        const allEpisodes = await getEpisodes();

        await Episode.bulkCreate(allEpisodes)

    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    saveApiData,
}