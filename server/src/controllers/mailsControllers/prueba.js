const transporter = require("../../helpers/nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const prueba = async (emailUser, message) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: emailUser,
      subject: "Prueba Neoshop",
      text: "Este es un texto de prueba",
      html: message,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = prueba;
