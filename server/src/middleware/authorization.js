const jsonwebtoken = require("jsonwebtoken");
const { user } = require("../db.js");
const dotenv = require("dotenv");

dotenv.config();
async function onlyAdmin(req, res, next) {
  const logged = authCookie(req);
  if (logged) return next();
  return res.redirect("/home");
}

function onlyPublic(req, res, next) {
  const logged = authCookie(req);
  if (!logged) return next();
  return res.redirect("/");
}

async function authCookie(req) {
    const { id_user } = req.body;
    if (!req.headers.cookie || !req.headers.cookie.includes("jwt=")) {
      return false; // Retorna falso si no se encontró la cookie
    }
  
    try {
      const cookieJWT = req.headers.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("jwt="))
        .slice(4);
      const cookieDecodificada = jsonwebtoken.verify(
        cookieJWT,
        process.env.JWT_SECRET
      );
      console.log("COOKIE: " + cookieJWT);
  
      const theUser = await user.findByPk(id_user);
  
      if (!theUser) {
        console.log({ status: "Error", message: "Usuario no encontrado" });
        return false; // Retorna falso si el usuario no se encontró
      }
      if (theUser.id_user !== cookieDecodificada.user) {
        return false; // Retorna falso si el usuario no coincide con el de la cookie
      }
      
      return true; // Retorna verdadero si todo está bien
    } catch (error) {
      console.error("Error durante la verificación:", error);
      return false; // Retorna falso si hay un error durante la verificación
    }
  }
  

module.exports = {
  onlyAdmin,
  onlyPublic,
};