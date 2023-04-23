const axios = require("axios");

const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";

const getCharById = (req, res) => {

    const { id } = req.params;

    if(!id){
        return res.status(404).send("Not fount")
    };

    axios.get(`${URL_BASE}/${id}?key=${API_KEY}`)
    .then((respose) => {
        const { id, name, species, image, gender, origin, status } = respose.data;
        return res.status(200).json({ id, name, species, image, gender, origin, status });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message })
    })
};

module.exports = getCharById;