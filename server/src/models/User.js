const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id_user: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      nro_document: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 20],
          isAlphanumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_verified: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[0-9\-\+\s]+$/,
          },
        },
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: true, //se permite null para poder cargar usuarios autenticados por terceros
      },
      adress_street: {
        type: DataTypes.STRING,
      },
      adress_nro: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      quantity_review: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_type: {
        type: DataTypes.ENUM("shoppeer", "trader", "admin"),
        defaultValue: "shoppeer",
        allowNull: true,
      },
      sign_in_provider: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
