const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

const { saveApiData } = require('./src/controllers/saveApiData.js');

const PORT = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await saveApiData();
  console.log('DB connected');
  server.listen(PORT, () => {
    console.log(`Server raised in port: http://localhost:${PORT}`);
  })
}).catch((error) => {
  console.log(error);
});

//Quitar el {force: true} para que los datos se queden guardados. 'conn.sync()'