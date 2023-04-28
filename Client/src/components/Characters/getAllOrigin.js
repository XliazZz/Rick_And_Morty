const axios = require('axios');

async function getAllOrigins() {
  const allOrigins = new Set();

  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const characters = response.data.results;

      // Obtener los nombres de origin de los personajes de la página actual
      const origins = characters.map(character => character.origin.name);

      // Agregar los nombres de origin al conjunto
      origins.forEach(origin => allOrigins.add(origin));

      // Actualizar el número total de páginas desde la respuesta
      totalPages = response.data.info.pages;

      // Incrementar el contador de página
      page++;
    } catch (error) {
      console.error('An error occurred while fetching characters:', error.message);
      break;
    }
  }

  return Array.from(allOrigins);
}

// Llamar a la función para obtener todos los nombres de origin sin repetir
getAllOrigins()
  .then(origins => {
    console.log(origins);
  })
  .catch(error => {
    console.error('An error occurred:', error.message);
  });
