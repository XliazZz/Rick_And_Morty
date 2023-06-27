const { Character } = require('../../db');

const getCharById = async (id) => {
    try{
        const character = await Character.findOne({
            where: { id: id }
        })

        if (!character) {
            throw new Error(`Character not found`)
        }
        return character
    }
    catch (error) {
        throw new Error('Could not fetch character by ID: ' + error.message);    
    }
}

module.exports = getCharById;