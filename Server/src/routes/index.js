const {getCharById} = require("../controllers/getCharById");
const {postFav, deleteFav} = require("../controllers/handleFavorites");
const {login} = require("../controllers/login");
const { Router } = require('express');

const router = Router();

// router.get("/character/:id", getCharById);
// router.get("/login", login);
// router.post("/fav", postFav);
// router.delete("/fav/:id", deleteFav);

router.get('/character/:id', (req, res) => {
    getCharById(req, res);
});

router.get('/login', login);

router.post('/fav', (req, res) => {
    postFav(req, res);
});

router.delete('/fav/:id', (req, res) => {
    deleteFav(req, res);
});

module.exports = {
    router,
}