const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;
const { Favorite } = require('../../db');

const postFav = async (req, res) => {
  try {
    const { characterId } = req.body; // Obtén el ID del personaje de la solicitud

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'No se proporcionó el token de autenticación.' });
    }

    try {
      const decoded = jwt.verify(token, AUTH_SECRET);
      const userId = decoded.user.id; // Obtén el ID del usuario desde el token

      // Asocia el personaje favorito al usuario correspondiente
      const favorite = await Favorite.create({
        userId: userId,
        characterId: characterId
      });
      console.log(favorite);

      return res.json({ msg: 'Personaje agregado como favorito.', favorite: favorite });
    } catch (error) {
      return res.status(401).json({ msg: 'Token inválido.' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error al agregar el personaje como favorito.' });
  }
};

module.exports = postFav;
