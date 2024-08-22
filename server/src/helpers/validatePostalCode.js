const axios = require("axios");

const validatePostalCode = async (postalCode, country) => {
  const url = `http://api.zippopotam.us/${country}/${postalCode}`;
  try {
    const {data} = await axios(url);
    //console.log(data);
    if (data) {
        console.log("Entre al true");
      return true;
    }
    console.log("Entre al false");
    return false;
  } catch (error) {
    console.log("Entre al catch");
    return false;
  }
};

module.exports = validatePostalCode;