require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_DEPLOY } = process.env;
const userModel = require("./models/User");
const productModel = require("./models/Product");
const orderModel = require("./models/Order");
const order_detailModel = require("./models/OrderDetail");
const paymentModel = require("./models/Payment");
const reviewModel = require("./models/Review");
const categoryModel = require("./models/Category");
const cartModel = require("./models/Cart");
const discountsModel = require("./models/Discounts");
const storeModel = require("./models/Store");
const brandModel = require("./models/Brand");
const favoritesModel = require("./models/Favorites");

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

// Descomentar esto para trabajar localmente
//const sequelize = new Sequelize(
  //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  //{
    //logging: false,
    //native: false,
  //}
//);<
userModel(sequelize);
productModel(sequelize);
orderModel(sequelize);
order_detailModel(sequelize);
paymentModel(sequelize);
reviewModel(sequelize);
categoryModel(sequelize);
cartModel(sequelize);
discountsModel(sequelize);
storeModel(sequelize);
brandModel(sequelize);
favoritesModel(sequelize);
//Relaciones
const {
  product,
  order,
  store,
  order_detail,
  payment,
  review,
  user,
  discounts,
  cart,
  category,
  brand,
  favorites,
} = sequelize.models;

//Relacion de user a product de muchos a muchos, va servir para guardar favoritos del user
user.belongsToMany(product, { through: "user_product" });
product.belongsToMany(user, { through: "user_product" });

//Relacion de muchos a muchos de user a store
store.belongsToMany(user, { through: "store_user" });
user.belongsToMany(store, { through: "store_user" });

//Relación de 1 a muchos de usuario a order
user.hasMany(order);
order.belongsTo(user);

// Relación de User a Cart (1 a 1){foreignKey es porque el nombre con el que guardaba era incorrecto}
user.hasOne(cart, { foreignKey: "id_user" });
cart.belongsTo(user, { foreignKey: "id_user" });

// Relación de product a Review (1 a muchos)
product.hasMany(review);
review.belongsTo(product);

//Relación de review a usuarios (muchos a 1)
user.hasMany(review);
review.belongsTo(user);

//relacion de store a producto de 1 a muchos
store.hasMany(product);
product.belongsTo(store);

//marca a producto de 1 a muchos
brand.hasMany(product);
product.belongsTo(brand);

// Relación de Cart a product (muchos a muchos)
cart.belongsToMany(product, { through: "cart_product" });
product.belongsToMany(cart, { through: "cart_product" });

// Relación de category a product (muchos a muchos)
category.belongsToMany(product, { through: "category_product" });
product.belongsToMany(category, { through: "category_product" });

// Relación de Discounts a product (uno a uno)
discounts.hasOne(product);
product.belongsTo(discounts);

// Relación de Order a Payment (1 a 1)
order.hasOne(payment);
payment.belongsTo(order);

// Relacion de order a order_item de 1 a muchos
order.hasMany(order_detail);
order_detail.belongsTo(order);

// Por ahora asi (Lucas y Mati)
user.belongsToMany(payment, { through: "user_payments" });
payment.belongsToMany(user, { through: "user_payments" });

// Relación de User a Category (uno a muchos)
user.hasMany(category);
category.belongsTo(user);

module.exports = {
  //...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  product,
  order,
  store,
  order_detail,
  payment,
  review,
  user,
  discounts,
  cart,
  category,
  brand,
  favorites,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
