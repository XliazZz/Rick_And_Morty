const { Character } = require('../../db');
const { conn } = require('../../db');

const listGender = async () => {
  try {
    const gender = await Character.findAll({
      attributes: [[conn.fn('DISTINCT', conn.col
      ('gender')), 'gende']]
    });
    const genderValues = gender.map(gende => gende.get('gende'));
    return genderValues;
  } catch (error) {
    throw new Error(`Error searching for status: ${error.message}`);
  };
};

module.exports = listGender;