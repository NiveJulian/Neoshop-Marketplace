const validationLogin = (
  { email, password, newPassword, confirmPassword },
  errors,
  setErrors,
  view
) => {
  let newErrors = { ...errors };

  // Validación de email (común para todas las vistas)
  if (!email) {
    newErrors.email = "El correo electrónico está vacío";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "El correo electrónico no es válido";
  } else {
    newErrors.email = "";
  }

  // Validación de password (solo para vista de login)
  if (view === "login") {
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
  }

  // Validación de newPassword y confirmPassword (solo para vista de reset)
  if (view === "reset") {
    if (!newPassword) {
      newErrors.newPassword = "El nuevo password está vacío";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "El nuevo password debe tener al menos 6 caracteres";
    } else if (
      !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(newPassword)
    ) {
      newErrors.newPassword = "El nuevo password debe contener al menos un número, una letra mayúscula, una letra minúscula y un símbolo especial";
    } else {
      newErrors.newPassword = "";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "El confirmar password está vacío";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "El password de confirmación no coincide con el nuevo password";
    } else {
      newErrors.confirmPassword = "";
    }
  }

  setErrors(newErrors);
};

export default validationLogin;