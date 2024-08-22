const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "payment",
    {
      id_payment: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      id_user: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentProducts: {  
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Valida que sea una fecha válida
          isAfter: "1900-01-01", // Asegura que la fecha no sea ridículamente antigua
      },
      },
      amount: {
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
