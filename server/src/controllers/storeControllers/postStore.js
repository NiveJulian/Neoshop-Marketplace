const { store, user } = require("../../db.js");

async function postStore(data) {
  const { address_cp, address_country, address_city, name, logo, id_user } = data;
  //console.log(data);

  if (!address_cp || !address_country || !address_city || !name) {
    throw new Error("Missing data");
  }

  //Buscamos el usuario
  const theUser = await user.findByPk(id_user);
  if (!theUser) {
    throw new Error("User not found");
  }

  // Verificar si ya existe una tienda con el mismo nombre y dirección
  const existingStore = await store.findOne({
    where: {
      name,
    },
  });

  if (existingStore) {
    throw new Error("The store name is already in use");
  }

  const createNewStore = await store.create({
    name,
    address_cp,
    address_country,
    address_city,
    logo,
    id_user
  });

  await theUser.addStore(createNewStore);

  // Verificar si existe un id_user y actualizar user_type a "admin"
  if (theUser.id_user) {
    await user.update({ user_type: "trader" }, { where: { id_user: theUser.id_user } });
  }

  return { message: "Store saved successfully", store: createNewStore };
}

module.exports = postStore;
