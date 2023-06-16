const listStatus = require('../listStatus');

const getStatus = async (req, res) => {
  try {
    const status = await listStatus();
    res.status(200).json(status)
  } catch (error) {
    res.status(404).send(error.message);
  };
};

module.exports = getStatus;