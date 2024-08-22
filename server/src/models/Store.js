const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "store",
    {
      id_store: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del producto no puede estar vacío",
          },
          len: {
            args: [2, 50],
            msg: "El nombre del producto debe tener entre 2 y 50 caracteres",
          },
        },
      },
      address_cp: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          len: [1, 5],
          is: /^[0-9]+$/, // Valida que solo contenga números
        },
      },
      address_country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
        },
      },
      address_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
        },
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true // Valida que sea una URL válida
        }
      },
      id_user: {
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );
};
