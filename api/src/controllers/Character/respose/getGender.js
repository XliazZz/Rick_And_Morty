const listGender = require('../listGender');

const getGender = async (req, res) => {
  try {
    const gender = await listGender();
    console.log(gender);
    res.status(200).json(gender);
  } catch (error) {
    res.status(404).send(error.message);
  };
};

module.exports = getGender;