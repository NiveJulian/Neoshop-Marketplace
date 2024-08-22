const { Op } = require("sequelize");
const { product, category, store, brand } = require("../../db");

const filterByOptionProducts = async ({
  store: storeSearch,
  brand: brandSearch,
  category: categorySearch,
  minPrice,
  maxPrice,
  minPoint,
  maxPoint,
}) => {
  let whereCondition = {};
  let includeCondition = [];

  // Buscar el store si storeSearch está definido
  if (storeSearch) {
    const storeFind = await store.findOne({
      where: {
        name: storeSearch,
      },
    });
    console.log(storeFind)
    if (storeFind) {
      whereCondition.storeIdStore = storeFind.id_store;
    } else {
      return { error: `Store with name ${storeSearch} not found` };
    }
  }

  // Buscar el brand si brandSearch está definido
  if (brandSearch) {
    const brandFind = await brand.findOne({
      where: {
        name: brandSearch,
      },
    });
    if (brandFind) {
      whereCondition.brandIdBrand = brandFind.id_brand;
    } else {
      return { error: `Brand with name ${brandSearch} not found` };
    }
  }

  // Agregar filtros de precio si están definidos
  if (minPrice !== undefined || maxPrice !== undefined) {
    whereCondition.price = {};
    if (minPrice !== undefined) {
      whereCondition.price[Op.gte] = minPrice;
    }
    if (maxPrice !== undefined) {
      whereCondition.price[Op.lte] = maxPrice;
    }
  }

  // Agregar filtros de puntos si están definidos
  if (minPoint !== undefined || maxPoint !== undefined) {
    whereCondition.points = {};
    if (minPoint !== undefined) {
      whereCondition.points[Op.gte] = minPoint;
    }
    if (maxPoint !== undefined) {
      whereCondition.points[Op.lte] = maxPoint;
    }
  }

  // Agregar el filtro de categoría si categorySearch está definido
  if (categorySearch) {
    includeCondition.push({
      model: category,
      attributes: ['name'],
      where: {
        name: categorySearch,
      },
      through: {
        attributes: [], // Esto excluye atributos de la tabla intermedia
      },
    });
  }

  // Incluir la tienda y la marca, seleccionando solo el nombre
  includeCondition.push({
    model: store,
    attributes: ['name'],
  });
  includeCondition.push({
    model: brand,
    attributes: ['name'],
  });

  // Realizar la consulta de productos con los filtros aplicados
  const productsResult = await product.findAll({
    where: whereCondition,
    include: includeCondition,
    attributes: {
      exclude: ['createdAt', 'updatedAt'], // Excluye campos innecesarios de la tabla product si es necesario
    },
  });

  return productsResult;
};

module.exports = filterByOptionProducts;