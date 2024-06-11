const validationFormRegisterStore = (formData) => {
    let errors = {};
  
    // Validación del código postal
    if (!formData.address_cp.trim()) {
      errors.address_cp = "Postal Code is required";
    }
  
    // Validación del país
    if (!formData.address_country.trim()) {
      errors.address_country = "Country is required";
    }
  
    // Validación de la ciudad
    if (!formData.address_city.trim()) {
      errors.address_city = "City is required";
    }
  
    // Validación del nombre de la tienda
    if (!formData.name.trim()) {
      errors.name = "Store Name is required";
    }
  
    // Validación del logo
    if (!formData.logo.trim()) {
      errors.logo = "Logo URL is required";
    }
  
    return errors;
  };
  
  export default validationFormRegisterStore;
  