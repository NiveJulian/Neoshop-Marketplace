const { product, category, store, brand } = require("../../db.js");
const mayuscName = require("../../helpers/mayuscName.js");

const modifyProduct = async (data) => {
    try {
        const {id_product, id_store} = data;

        const theProduct = await product.findByPk(id_product);
        if(!theProduct) throw new Error("Product not found");

        const theStore = await store.findByPk(id_store);
        if(!theStore) throw new Error("Store not found");

        if(theProduct.storeIdStore !== theStore.id_store) throw new Error("You do not have permission to perform this action");

        if(data.name){
          const correctName = mayuscName(data.name);
          data.name = correctName;

          const duplicate = await product.findOne({
            where: {
              name: data.name
            },
          });
          
          if(duplicate){
            throw new Error("The product already exists");
          };
        };

        if(data.brand){
          await brand.findOrCreate({
            where: {
              name: data.brand
            }
          });
          const theBrand = await brand.findOne({
            where: {
              name: data.brand
            }
          });
          data.brandIdBrand = theBrand.id_brand;
        }

        const [updated] = await product.update(data, {
          where: { id_product }
        });

        if (!updated) throw new Error("Product update failed");

        const updatedProduct = await product.findByPk(id_product);
  
        if(data.categoryName){
          const newCategorys = await Promise.all(
            data.categoryName.map(async (n) => {
              const [newCategory] = await category.findOrCreate({
                where: {
                  name: n,
                },
              });
              return newCategory;
            })
          );
          await updatedProduct.setCategories(newCategorys);
        };

        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = modifyProduct;