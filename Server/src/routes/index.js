const {getCharById} = require("../controllers/getCharById");
const {postFav, deleteFav} = require("../controllers/handleFavorites");
const {login} = require("../controllers/login");
const { Router } = require('express');
const { sendRandomCharacters } = require("../controllers/randomCharacters");
const { createUser, getAllUsers } = require("../utils/users");
const { getUserByEmail } = require('../utils/users'); // Importar el método para obtener un usuario por correo electrónico
const { filterSpecies } = require("../controllers/filterSpecies");
const { filterStatus } = require("../controllers/filterStatus");
const { filterGender } = require("../controllers/filterGender");

const router = Router();

// router.get("/character/:id", getCharById);
// router.get("/login", login);
// router.post("/fav", postFav);
// router.delete("/fav/:id", deleteFav);

router.get('/character/:id', (req, res) => {
    getCharById(req, res);
});

router.get('/login', (req, res) => {
    const { email, password } = req.query;
    
        // Obtener el usuario por correo electrónico
        const user = getUserByEmail(email);
    
        if (user && user.password === password) {
        return res.status(200).json({ access: true });
        } else {
        return res.status(404).json({ access: false });
    }
});

router.post('/fav', (req, res) => {
    postFav(req, res);
});

router.delete('/fav/:id', (req, res) => {
    deleteFav(req, res);
});

router.get('/random', (req, res) => {
    sendRandomCharacters(req, res);
});

router.post("/users", (req, res) => {
    const user = req.body;
    createUser(user);
    res.status(200).json({ message: "Create user success ;)" })
})

router.get('/users', (req, res) => {
    const users = getAllUsers();
    res.json(users);
});

router.get('/species', async (req, res) => {
    const species = req.query.species;
    try {
        const filteredCharacters = await filterSpecies(species);
        res.json(filteredCharacters);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred. (species)' });
    }
});

router.get('/status', async (req, res) => {
    const status = req.query.status;
    try {
        const filteredCharacters = await filterStatus(status);
        res.json(filteredCharacters);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred. (status)' });
    }
});

router.get('/gender', async (req, res) => {
    const gender = req.query.gender;
    try {
        const filteredCharacters = await filterGender(gender);
        res.json(filteredCharacters);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred. (gender)' });
    }
});


module.exports = {
    router,
}