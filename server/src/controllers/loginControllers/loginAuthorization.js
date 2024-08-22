const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const admin = require("./firebaseAdmin");
const { user } = require("../../db.js");
dotenv.config();

const authorization = async (token, provider) => {
    try {
        if (provider === "jwt") {
            const auth = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            const theUser = await user.findByPk(auth.user);
            return theUser;
        }
        if (provider === "google"){
            const decodedToken = await admin.auth().verifyIdToken(token);
            const theUser = await user.findByPk(decodedToken.uid);
            return theUser;
        }
    } catch (error) {
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            throw new Error("Token has expired");
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            throw new Error("Invalid token");
        } else {
            throw new Error("Token verification error");
        }
    }
};

module.exports = authorization;