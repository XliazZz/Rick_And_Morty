const listSpecies = require('../listSpecies');

const getSpecies = async (req, res) => {
  try {
    const species = await listSpecies();
    console.log(species);
    res.status(200).json(species);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = getSpecies