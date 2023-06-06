const { User } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;

const signIn = (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  // Buscar usuario
  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        console.log("no encontrado");
        return res.status(404).json({ msg: "Usuario no encontrado." });
      }

      if (bcrypt.compareSync(password, user.password)) {
        // Generar token
        const token = jwt.sign({ user: user }, AUTH_SECRET, {
          expiresIn: AUTH_EXPIRES
        });

        res.json({
          user: user,
          token: token
        });
      } else {
        res.status(401).json({ msg: "Contraseña incorrecta." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const signUp = (req, res) => {
  // Encriptado de contraseña
  const password = bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

  // Crear usuario
  User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: password,
    gender: req.body.gender,
  })
    .then(user => {
      // Crear token
      const token = jwt.sign({ user: user }, AUTH_SECRET, {
        expiresIn: AUTH_EXPIRES
      });

      res.json({
        user: user,
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = { signIn, signUp };
