const axios = require("axios");

const URL = 'https://rickandmortyapi.com/api/character';

const getCharById = async (req, res) => {
    const { id } = req.params;

    try{
        const respose = await axios(`${URL}/${id}`);
        const {status, name, species, origin, image, gender} = respose.data;
        
        if (name) {
            const character = {
                id,
                name,
                species,
                origin,
                image,
                gender,
                status,
            };
            return res.status(200).json(character);
        }
        return res.status(404).send('Not found');
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {getCharById};