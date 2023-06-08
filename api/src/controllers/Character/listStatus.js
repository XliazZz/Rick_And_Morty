const { Character } = require('../../db');
const { conn } = require('../../db');

const listStatus = async () => {
  try {
    const status = await Character.findAll({
      attributes: [[conn.fn('DISTINCT', conn.col
      ('status')), 'statu']]
    });
    const statusValues = status.map(statu => statu.get('statu'));
    return statusValues;
  } catch (error) {
    throw new Error(`Error searching for status: ${error.message}`);
  };
};

module.exports = listStatus;