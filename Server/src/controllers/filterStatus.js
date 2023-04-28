const axios = require('axios');

async function filterStatus(status, page = 1, filteredCharacters = []) {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
            params: {
                status: status,
                page: page
            }
        });

        const characters = response.data.results;
        const updatedCharacters = [...filteredCharacters, ...characters];

        if (response.data.info.next) {
            return filterStatus(status, page + 1, updatedCharacters);
        } else {
            return updatedCharacters;
        }
    } catch (error) {
        throw new Error('An error occurred while fetching characters');
    }
}

module.exports = {
    filterStatus,
}
