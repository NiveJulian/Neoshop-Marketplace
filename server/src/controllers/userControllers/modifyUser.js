const { user } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");

const modifyUser = async (data) => {
  try {
    let {id_user, email, name, lastname, password, newPassword} = data;

    const theUser = await user.findByPk(id_user);
    if(!theUser) throw new Error("User not found");

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexEmail.test(email)) throw new Error("Invalid Email");
    
    const existEmail = await user.findOne({
        where: {email}
    });
    if (existEmail && existEmail.id_user !== theUser.id_user) {
        throw new Error("The email is already associated with an account");
    }

    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
    if(name){
        if(!regexName.test(name)) throw new Error("Invalid Name");
        const correctName = mayuscName(name);
        data.name = correctName;
    };
    if(lastname){
        if(!regexName.test(lastname)) throw new Error("Invalid Lastname");
        const correctLastname = mayuscName(lastname);
        data.lastname = correctLastname;
    };

    if(newPassword){
      if(!password) throw new Error ("You must enter your current password");

      const correctLogin = await bcryptjs.compare(password, theUser.password);
      if(!correctLogin) throw new Error("Incorrect password");

      const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if(!regexPassword.test(newPassword)) throw new Error("Invalid Password");
      const hashPassword = await bcryptjs.hash(newPassword, 10);
      data.password = hashPassword;
    };

    const [updated] = await user.update(data, {
        where: { id_user }
      });
      if (updated) {
        const updatedUser = await user.findByPk(id_user);
        return updatedUser;
      } else {
        throw new Error("User update failed");
      }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = modifyUser;