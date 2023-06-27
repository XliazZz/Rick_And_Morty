const { Episode } = require('../../db');

const getAllEpisodes = async () => {
  try {
    const allEpisodes = await Episode.findAll();
    return allEpisodes;
  } catch (error) {
    throw new Error(`Error in getAllEpisodes: ${error.message}`);
  }
};

module.exports = getAllEpisodes;
