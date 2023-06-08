const { Router } = require('express');
const router = Router();

// User
const getAllUsers = require("../controllers/User/users");
const { signIn, signUp } = require('../controllers/User/authController');

// Character
const {getCharById} = require("../controllers/Character/getCharById");
const { sendRandomCharacters } = require("../controllers/Character/randomCharacters");
const getSpecies = require("../controllers/Character/respose/getSpecies");
const getStatus = require("../controllers/Character/respose/getStatus");
const getGender = require("../controllers/Character/respose/getGender");

// Favorite
const postFav = require('../controllers/Favorite/postFav');
const deleteFav = require('../controllers/Favorite/deleteFav');
const getAllFavorites = require('../controllers/Favorite/getAllFavorites');
const getAllCharacters = require('../controllers/Character/getAllCharacters');



// ---------------------------------------- !RESPUESTAS ------------------------------------------

// User
router.get('/api/signin', signIn);

router.post('/api/signup', signUp);

router.get('/users', (req, res) => {
    const users = getAllUsers();
    res.json(users);
});


// Character
router.get('/character/:id', (req, res) => {
    getCharById(req, res);
});

router.get('/random', (req, res) => {
    sendRandomCharacters(req, res);
});

router.get('/species', getSpecies);
router.get('/status', getStatus);
router.get('/gender', getGender);

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

router.get('/characters', async (req, res) => {
    try {
        const characters = await getAllCharacters();
        res.status(200).json(characters);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

// Favorite

router.post('/fav', async (req, res) => {
  try {
    const token = req.headers.Authorization?.split(' ')[1];
    const character = req.body.character; // Modificación aquí
      const fav = await postFav(character, token); // Modificación aquí

      res.status(200).json(fav);
  } catch (error) {
      console.error('Error in /fav route:', error);
      res.status(404).send(error.message);
  }
});



router.delete('/fav/:id', (req, res) => {
    deleteFav(req, res);
});

router.get('/favorites', async (req, res) => {
    try {
        const favorites = await getAllFavorites();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

module.exports = router