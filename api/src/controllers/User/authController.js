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
        return res.status(404).json({ msg: "User not found." });
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
        res.status(401).json({ msg: "Incorrect password." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const signUp = async (req, res) => {
  try {
    // Verificar si el correo electrónico ya existe
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Encriptado de contraseña
    const password = bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

    // Crear usuario
    const user = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: password,
      gender: req.body.gender,
    });

    // Crear token
    const token = jwt.sign({ user: user }, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES
    });

    res.json({
      user: user,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const signInGoogle = (req, res) => {
  const email = req.query.email;

  User.findOne({
    where: {
      email: email
    }
  })
  .then(user => {
    if (!user) {
      console.log("Not found");
      return res.status(404).json({ msg: "User not found." })
    }
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
    res.status(500).json(err)
  })
};


const signUpGoogle = async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const password = bcrypt.hashSync(req.body.email, Number.parseInt(AUTH_ROUNDS));

    const user = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: password,
      gender: "Other",
    });

    const token = jwt.sign({ user: user }, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES
    });

    res.json({
      user: user,
      token: token
    });

  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeValidationError') {
      // Si hay errores de validación en los campos de la base de datos
      const validationErrors = error.errors.map((err) => err.message);
      res.status(400).json({ error: validationErrors });
    } else {
      // Para cualquier otro tipo de error
      res.status(500).json({ error: 'Error creating user' });
    }
  }
};



module.exports = { signIn, signUp, signInGoogle, signUpGoogle };
