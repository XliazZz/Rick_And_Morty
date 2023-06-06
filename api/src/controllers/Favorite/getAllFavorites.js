const { Favorite } = require('../../db');

const getAllFavorites = async () => {
    try {
        const allFavorites = await Favorite.findAll();

        if(!allFavorites) throw new Error('No favorites')
        
        return allFavorites;

    } catch (error) {
        return { error: error.message }
    }

}

module.exports = getAllFavorites;