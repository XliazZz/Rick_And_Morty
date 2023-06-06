const axios = require('axios');

async function filterGender(gender, page = 1, filteredCharacters = []) {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
            params: {
                gender: gender,
                page: page
            }
        });

        const characters = response.data.results;
        const updatedCharacters = [...filteredCharacters, ...characters];

        if (response.data.info.next) {
            return filterGender(gender, page + 1, updatedCharacters);
        } else {
            return updatedCharacters;
        }
    } catch (error) {
        throw new Error('An error occurred while fetching characters');
    }
}

module.exports = {
    filterGender,
}
