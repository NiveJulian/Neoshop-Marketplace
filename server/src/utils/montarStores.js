const express = require('express');
const fakesStores = express.Router();
const datosStore = require("./datosStore");
const postStore = require("../controllers/storeControllers/postStore");
const {user} = require("../db.js");

fakesStores.post('', async (req, res) => {
  try {
      const users = await user.findAll();
    let stores = [];

    for(let i=0;i<users.length;i++){
      const newStore = {...datosStore[i], id_user: users[i].id_user};

      if(newStore.address_cp) stores.push(newStore);
    };
    stores.forEach( async (stor) => {
      await postStore(stor);
    });

    console.log("Datos de la store montados en la BD");
    res.status(200).json({ message: "Datos de la store montados en la BD" });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res.status(500).json({ error: "Error al guardar los datos", details: error.message });
  }
});

module.exports = fakesStores;
