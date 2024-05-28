
const validationLogin = (
    { name, life, attack, defense, speed, height, weight, types, },
    errors,
    setErrors
  ) => {
    let newErrors = { ...errors };
    
    if (!name && !name.trim()) {
      newErrors.name = "El nombre está vacío";
    } else if (!/^[a-zA-Z0-9\s]*$/.test(name)) {
      newErrors.name = "El nombre no puede contener simbolos"; //
    } else if (name.length > 35) {
      newErrors.name = "El nombre no debe superar los 35 caracteres";
    } else {
      newErrors.name = "";
    }
  
    if (!life) {
      newErrors.life = "La vida está vacía";
    } else if (!/^\d{1,2}$/.test(life)) {
      newErrors.life = "La vida debe ser un número de 1 o 2 cifras";
    }else {
      newErrors.life = "";
    }
  
    if (!attack) {
      newErrors.attack = "El ataque están vacías";
    } else if (!/^\d{1,2}$/.test(attack)) {
      newErrors.attack = "El ataque debe ser un número de 1 o 2 cifras";
    } else {
      newErrors.attack = "";
    }
  
    if (!defense) {
      newErrors.defense = "La defensa está vacía";
    } else if (!/^\d{1,2}$/.test(defense)) {
      newErrors.defense = "La defenza debe ser un número de 1 o 2 cifras";
    } else {
      newErrors.defense = "";
    }
  
    if (!speed) {
      newErrors.speed = "La velocidad está vacío";
    } else if (!/^\d{1,2}$/.test(speed)) {
      newErrors.speed = "La velocidad debe ser un número de 1 o 2 cifras";
    } else {
      newErrors.speed = "";
    }
  
    if (!height) {
      newErrors.height = "La altura está vacía";
    } else if (!/^\d{1,2}$/.test(height)) {
      newErrors.height = "La altura debe ser un número de 1 o 2 cifras";
    } else {
      newErrors.height = "";
    }
  
    if (!weight) {
      newErrors.weight = "El peso está vacío";
    } else if (!/^\d{1,2}$/.test(weight)) {
      newErrors.weight = "El peso debe ser un número de 1 o 2 cifras";
    } else {
      newErrors.weight = "";
    }
  
    if (!types) {
      newErrors.types = "Debes elegir algun tipo para tu pokemon";
    } else if (!(types.length >= 1)) {
      newErrors.types = "Los generos deben ser al menos 1";
    } else {
      newErrors.types = "";
    }
  
    setErrors(newErrors);
  };
  
  export default validationLogin;
  