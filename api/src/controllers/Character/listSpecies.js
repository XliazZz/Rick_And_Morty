const { Character } = require('../../db');
const { conn } = require('../../db');

const listSpecies = async () => {
  try {
    const species = await Character.findAll({
      attributes: [[conn.fn('DISTINCT', conn.col
      ('species')), 'specie']]
    });
    const speciesValues = species.map(specie => specie.get('specie'));
    return speciesValues
  } catch (error) {
    throw new Error(`Error searching for species: ${error.message}`);
  }  ;
};

module.exports = listSpecies;