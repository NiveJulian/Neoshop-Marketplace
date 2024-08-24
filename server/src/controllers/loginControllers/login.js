const { user } = require('../../db.js');
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (email, password) => {
    if(!email || !password) throw new Error("Incomplete data");

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexEmail.test(email)) throw new Error("Invalid email");

    const theUser = await user.findOne({
        where: { email }
    });
    if(!theUser) throw new Error("Wrong email");

    if(theUser.is_active === false) throw new Error("Deleted account");

    const correctLogin = await bcryptjs.compare(password, theUser.password);
    if(!correctLogin) throw new Error("Incorrect password");

    const token = jsonwebtoken.sign(
        {user: theUser.id_user},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        sameSite: "Lax", // Asegúrate de que sea 'None' si estás usando cookies entre dominios
        secure: false
    };
    console.log(theUser)
    
    return {
        correctLogin,
        token,
        cookieOption,
        user: theUser
    };
};

module.exports = login;
