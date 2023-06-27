const { Op } = require('sequelize');
const { Character } = require('../../db');

const getCharacterByName = async (name) => {
  try {
    const characters = await Character.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })
    if (characters.length === 0) {
      throw new Error(`No characters found with name: ${name}`)
    }
    return characters;
  } catch (error) {
    throw new Error(`${error.message}`);
  };
};

module.exports = getCharacterByName;