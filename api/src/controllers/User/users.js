const { User } = require('../../db');

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Llamada a la función para obtener todos los usuarios
getAllUsers()
  .then(users => {
    // console.log(users);
  })
  .catch(error => {
    console.error('Error al obtener los usuarios:', error);
  });

module.exports = getAllUsers

