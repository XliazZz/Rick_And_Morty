const { Favorite } = require('../../db');
const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;

const getAllFavorites = async (token) => {
    try {

        if (!token) {
            throw new Error('Token missing/getAllFavorites');
        }

        const decoded = jwt.verify(token, AUTH_SECRET);
        const userId = decoded.user.id;

        const allFavorites = await Favorite.findAll({      
            where: { userId },
        });

        if(!allFavorites) throw new Error('No favorites')
        
        return allFavorites;

    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        throw new Error('Error al obtener favoritos: ' + error.message);    
    }

}

module.exports = getAllFavorites;