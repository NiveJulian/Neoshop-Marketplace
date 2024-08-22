const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id_product: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      img_product: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "El link de la imagen debe ser una URL válida",
          },
        },
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripción del producto no puede estar vacía",
          },
        },
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "El precio del producto debe ser un número decimal",
          },
          min: {
            args: [0],
            msg: "El precio del producto no puede ser negativo",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "La cantidad del producto debe ser un número entero",
          },
          min: {
            args: [0],
            msg: "La cantidad del producto no puede ser negativa",
          },
        },
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      average_mark: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null,
      },
    },
    { timestamps: false }
  );
};
