
const validationLogin = (
    { email, password},
    errors,
    setErrors
  ) => {
    let newErrors = { ...errors };
    
    if (!email) {
      newErrors.email = "El correo electrónico está vacío";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    } else {
      newErrors.email = "";
    }
  
    if (!password) {
      newErrors.password = "El password está vacío";
    } else if (password.length < 6) {
      newErrors.password = "El password debe tener al menos 6 caracteres";
    } else if (
      !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)
    ) {
      newErrors.password = "El password debe contener al menos un número, una letra mayúscula, una letra minúscula y un símbolo especial";
    } else {
      newErrors.password = "";
    }
    setErrors(newErrors);
  };
  
  export default validationLogin;
  