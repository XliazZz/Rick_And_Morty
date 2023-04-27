const fs = require('fs');
const path = require('path');

const register = (req, res) => {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
        return res.status(404).json({ error: "Falta uno o más campos requeridos" });
    }

    const newUser = {
        name,
        lastname,
        email,
        password,
    };

    // Leer el archivo users.js
    const filePath = path.join(__dirname, 'users.js');
    let existingData = [];

    try {
        existingData = require(filePath);
    } catch (error) {
        // El archivo users.js no existe o está vacío
        existingData = [];
    }

    // Agregar el nuevo usuario al array existente
    existingData.push(newUser);

    // Escribir los datos actualizados en el archivo users.js
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(existingData)};`);

    return res.status(200).json({ message: "Registro exitoso", user: newUser });
    };

    module.exports = {
    register,
};