const { Favorite } = require('../../db');
const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;

const postFav = async (character, token) => {
    try {
        if (!token) {
            throw new Error('No se proporcionó el token de autenticación.');
        }

        try {
            const decoded = jwt.verify(token, AUTH_SECRET);
            const userId = decoded.user.id; // Obtén el ID del usuario desde el token
            const favorite = await Favorite.create({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin,
                image: character.image,
                location: character.location,
                userId: userId,
                characterId: character.id
            });


            return favorite;

        } catch (error) {
            throw new Error('Token inválido: ' + error.message);
        }
    } catch (error) {
        throw new Error('Error al agregar favorito: ' + error.message);
    }
};

module.exports = postFav;