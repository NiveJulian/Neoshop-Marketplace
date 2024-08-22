const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //cambiar "ethereal" dependiendo del mail que usemos para enviar(gmail, microsoft, etc)
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

module.exports= transporter;