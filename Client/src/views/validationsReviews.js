const validationReviews = (
    { reviewText, rating },
    errors,
    setErrors
  ) => {
    let newErrors = { ...errors };
    
    if (!reviewText) {
      newErrors.reviewText = "El correo electrónico está vacío";
    }else {
      newErrors.reviewText = "";
    }
  
    if (!rating) {
      newErrors.rating = "El rating está vacío";
    }else {
      newErrors.rating = "";
    }
  
    setErrors(newErrors);
  };
  
  export default validationReviews;
  