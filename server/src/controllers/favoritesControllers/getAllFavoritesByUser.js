const { user, favorites, product } = require("../../db.js");

const getAllFavoritesByUser = async (id_user) => {
    try {
        const theUser = await user.findByPk(id_user);
        if(!theUser) throw new Error("User not found");

        const allFavorites = await favorites.findAll({
            where: {id_user}
        });

        let allProducts = [];
        for(let i=0; i<allFavorites.length; i++){
            const id_product = allFavorites[i].id_product;
            const theProduct = await product.findByPk(id_product);
            allProducts.push(theProduct);
        };

        return allProducts;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getAllFavoritesByUser;