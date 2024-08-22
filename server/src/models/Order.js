const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      order_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Valida que sea una fecha válida
          isAfter: "1900-01-01", // Asegura que la fecha no sea ridículamente antigua
        },
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Verifica que sea un número entero
          min: 0, // Asegura que no sea un valor negativo
        },
      },

      state: {
        type: DataTypes.ENUM("created", "in_progress", "finalized"),
        defaultValue: "created",
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],//entre 1 y 20 caracteres
          is: /^[a-zA-Z0-9\s,'-]*$/, // Valida que solo contenga letras, números, espacios, comas y guiones
        },
      },
    },
    { timestamps: false }
  );
};
