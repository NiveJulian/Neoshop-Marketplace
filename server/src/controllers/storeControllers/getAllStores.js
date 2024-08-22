const { store } = require('../../db.js');

//This function get all the products from our DB
async function getAllStores(req, res) {
        const storeFromDB = await store.findAll();//Traemos todos las tiendas de la base de datos

        if (storeFromDB.length === 0) {//comprobamos que el array de tiendas no este vacio
            throw new Error("No stores found on the database.");
        }
        
        return(storeFromDB)
}

module.exports = getAllStores;