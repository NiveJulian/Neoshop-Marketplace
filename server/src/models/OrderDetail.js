const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order_detail",
    {
      id_order_detail: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Verifica que sea un número entero
          min: 1, // Asegura que sea al menos 1
        },
      },

      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Verifica que sea un número de punto flotante
          min: 0, // Asegura que no sea un valor negativo
        },
      },
    },
    { timestamps: false }
  );
};
