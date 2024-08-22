const { user } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");
//const validatePostalCode = require("./helpers/validatePostalCode.js");

const postUser = async (data) => {
  let {
    name,
    lastname,
    password,
    city,
    state,
    email,
    nro_document,
  } = data;
  if (
    !name ||
    !lastname ||
    !password ||
    !city ||
    !state ||
    !email
  )
    throw new Error("Incomplete data");

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!regexEmail.test(email)) throw new Error("Invalid Email");

  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if(!regexPassword.test(password)) throw new Error("Invalid Password");

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
  if(!regexName.test(name)) throw new Error("Invalid Name");
  if(!regexName.test(lastname)) throw new Error("Invalid Lastname");

  const regexNumber = /^\d+$/;
  if(!regexNumber.test(nro_document)) throw new Error("Invalid DNI");

  // const valCP = await validatePostalCode(postalCode, "BR");
  // console.log(valCP);
  // if(!valCP) throw new Error("Invalid Postal Code");

  const hashPassword = await bcryptjs.hash(password, 10);
  const correctName = mayuscName(name);
  const correctLastname = mayuscName(lastname);
  name = correctName;
  lastname = correctLastname

  const [newUser, created] = await user.findOrCreate({
    where: { email },
    defaults: {
      name,
      lastname,
      password: hashPassword,
      city,
      state,
      nro_document,
    },
  });

  if (created) return newUser;
  else{
    if(newUser.is_active === false){
      await user.update(
        { 
          is_active: true,
          name,
          lastname,
          password: hashPassword,
          city,
          state,
          nro_document,
        },
        { where: { email } }
      );
      return newUser;
    }else{
      throw new Error("The email is already associated with an account");
    };
  }; 
};
module.exports = postUser;
