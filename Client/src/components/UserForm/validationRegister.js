const validationRegister = ({ name, lastname, password, city, state, email, nro_document }) => {
  let newErrors = {};

  if (!name || !name.trim()) {
    newErrors.name = "El nombre está vacío";
  } else if (!/^[a-zA-Z\s]*$/.test(name)) {
    newErrors.name = "El nombre no puede contener símbolos";
  } else if (name.length > 35) {
    newErrors.name = "El nombre no debe superar los 35 caracteres";
  } else {
    newErrors.name = "";
  }

  if (!lastname || !lastname.trim()) {
    newErrors.lastname = "El apellido está vacío";
  } else if (!/^[a-zA-Z\s]*$/.test(lastname)) {
    newErrors.lastname = "El apellido no puede contener símbolos";
  } else if (lastname.length > 35) {
    newErrors.lastname = "El apellido no debe superar los 35 caracteres";
  } else {
    newErrors.lastname = "";
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

  if (!city || !city.trim()) {
    newErrors.city = "La ciudad está vacía";
  } else if (!/^[a-zA-Z\s]*$/.test(city)) {
    newErrors.city = "La ciudad no puede contener símbolos";
  } else {
    newErrors.city = "";
  }

  if (!state || !state.trim()) {
    newErrors.state = "El estado está vacío";
  } else if (!/^[a-zA-Z\s]*$/.test(state)) {
    newErrors.state = "El estado no puede contener símbolos";
  } else {
    newErrors.state = "";
  }

  if (!email) {
    newErrors.email = "El correo electrónico está vacío";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "El correo electrónico no es válido";
  } else {
    newErrors.email = "";
  }

  if (!nro_document) {
    newErrors.nro_document = "El nro_document está vacío";
  } else if (!/^\d{8,10}$/.test(nro_document)) {
    newErrors.nro_document = "El nro_document debe ser un número de 8 a 10 cifras";
  } else {
    newErrors.nro_document = "";
  }

  return newErrors;
};

export default validationRegister;
