const { user, favorites, product } = require("../../db.js");

const postFavorite = async (id_product, id_user) => {
    try {
        const theUser = await user.findByPk(id_user);
        if(!theUser) throw new Error("User not found");
        const theProduct = await product.findByPk(id_product);
        if(!theProduct) throw new Error("Product not found");

        const [newFav, created] = await favorites.findOrCreate({
            where: { id_product, id_user }
          });

        if(created) return {message: "Favorite save"};
        else return {message: "you already have this product added"};
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = postFavorite;
