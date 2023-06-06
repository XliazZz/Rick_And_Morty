const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   allowNull: false
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El name solo puede tener letras."
        },
        len: {
          args: [2, 255],
          msg: "El name tiene que ser entre 2 a 255 letras."
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El lastname solo puede tener letras."
        },
        len: {
          args: [2, 255],
          msg: "El lastname tiene que ser entre 2 a 255 letras."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña debe tener entre 6 a 255 caracteres."
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { tableName: "users", timestamps: false });
};