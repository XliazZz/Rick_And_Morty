// Importar el modelo Favorite desde DB_connection
const { Favorite } = require('../../db');

// Definir la función deleteFav
const deleteFav = async (id) => {
    try {
        const favoriteFinded = await Favorite.findByPK(id);

        if(!favoriteFinded) throw new Error('Favorite no finded');

        favoriteFinded.destroy();

        return 'Success';

    } catch (error) {
        return { error: error.message }
    }
};

// Exportar la función deleteFav
module.exports =  deleteFav ;
