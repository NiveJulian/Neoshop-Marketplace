const { user } = require("../../db");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const resetPassword = async (password, token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await user.findByPk(decoded.id_user);
    
        if (!foundUser) {
            throw new Error ("User not found");
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();
    
        return foundUser;
      } catch (error) {
        throw new Error (error.message);
      }
};

module.exports = resetPassword;