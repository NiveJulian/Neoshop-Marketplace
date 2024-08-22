const { Router } = require("express");
const productRoutes = Router();
//controllers
const getProducts = require("../controllers/productControllers/getProducts");
const getProductById = require("../controllers/productControllers/getProductById");
const postProduct = require("../controllers/productControllers/postProduct");
const getProductByName = require("../controllers/productControllers/getProductByName");
const getProductByDescription = require("../controllers/productControllers/getProductByDescription");
const getProductByBrand = require("../controllers/productControllers/getProductByBrand");
const getProductByStore = require("../controllers/productControllers/getProductByStore");
const getProductsByCategory = require("../controllers/productControllers/getProductByCategory");
const filterByOptionProducts = require("../controllers/productControllers/filterByOptionProducts");
const getLastestProducts = require("../controllers/productControllers/getLastestProducts");
const getAllProductsByStoreId = require("../controllers/productControllers/getAllProductsByStoreId");
const modifyProduct = require("../controllers/productControllers/modifyProduct");

//Este es para traer todos los productos
productRoutes.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Este es para traer un producto por id
productRoutes.get("/id/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;

    // Validar que idStore sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idProduct)) {
      return res
        .status(400)
        .json({ error: "Invalid parameter. It must be a valid UUID." });
    }
    const productData = await getProductById(idProduct);
    return res.status(200).json(productData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para poster productos
productRoutes.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      img_product,
      categoryName,
      fromStore,
      brand,
    } = req.body;
    // Verificar que todos los campos estén presentes
    if (!categoryName) {
      return res.status(400).json({ error: "Missing data: categoryName" });
    }
    if (!fromStore) {
      return res.status(400).json({ error: "Missing data: fromStore" });
    }
    if (!name) {
      return res.status(400).json({ error: "Missing data: name" });
    }
    if (!description) {
      return res.status(400).json({ error: "Missing data: description" });
    }
    if (!price) {
      return res.status(400).json({ error: "Missing data: price" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Missing data: quantity" });
    }
    if (!img_product) {
      return res.status(400).json({ error: "Missing data: img_product" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Missing data: brand" });
    }
    const posted = await postProduct({
      name,
      description,
      price,
      quantity,
      img_product,
      categoryName,
      fromStore,
      brand,
    });
    return res.status(200).json(posted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para traer tiendas o productos o descripciones etc
productRoutes.get("/global/:petition", async (req, res) => {
  try {
    const { petition } = req.params;

    // Verificación de que peticion es una cadena
    if (typeof petition !== "string") {
      return res.status(400).json({ error: "The parameter must be a string" });
    }

    // Verificación de que peticion no sea demasiado larga
    const petitionSeparado = petition.split("");
    if (petitionSeparado.length > 40) {
      return res.status(400).json({ error: "The parameter is too long" });
    }

    // Verificación de que peticion no contenga caracteres no permitidos
    const validpetitionPattern = /^[a-zA-Z0-9\s+]*$/;
    if (!validpetitionPattern.test(petition)) {
      return res
        .status(400)
        .json({ error: "The parameter contains invalid characters" });
    }

    //Lo mandamos a diferentes controladores para que haga la busqueda
    const [
      searchByName,
      searchByDescription,
      searchByStore,
      searchByBrand,
      searchByCategory,
    ] = await Promise.all([
      getProductByName(petition),
      getProductByDescription(petition),
      getProductByBrand(petition),
      getProductByStore(petition),
      getProductsByCategory(petition),
    ]);

    // Combinamos los resultados en un array
    const combinedResults = [
      ...searchByName,
      ...searchByDescription,
      ...searchByStore,
      ...searchByBrand,
      ...searchByCategory,
    ];

    // Usamos un Set para almacenar los IDs únicos de los productos
    const uniqueProducts = new Set();
    const searchResult = [];

    combinedResults.forEach((product) => {
      if (!uniqueProducts.has(product.id_product)) {
        uniqueProducts.add(product.id_product);
        searchResult.push(product);
      }
    });

    // Verificamos si hay resultados
    if (searchResult.length === 0) {
      return res.status(404).json({ error: "No results found" });
    }

    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para traer productos por nombre(solo prueba)
productRoutes.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const searchResult = await getProductByName(name);
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Este es para traer productos por descripcion(solo prueba)
productRoutes.get("/description/:description", async (req, res) => {
  try {
    const { description } = req.params;
    const searchResult = await getProductByDescription(description);
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Productos por marca (Solo prueba)
productRoutes.get("/brand/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const searchResult = await getProductByBrand(nombre);
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Productos por tienda (Solo prueba)
productRoutes.get("/store/:tienda", async (req, res) => {
  try {
    const { tienda } = req.params;
    const searchResult = await getProductByStore(tienda);
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Productos por categoria (Solo prueba)
productRoutes.get("/categoria/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const searchResult = await getProductsByCategory(nombre);
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Ruta para filtrar productos
productRoutes.get("/filter", async (req, res) => {
  try {
    const { store, brand, category, minPrice, maxPrice, minPoint, maxPoint } =
      req.query;
    const filterResult = await filterByOptionProducts({
      store,
      brand,
      category,
      minPrice,
      maxPrice,
      minPoint,
      maxPoint,
    });
    return res.status(200).json(filterResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Ruta para traer los ultimos 8 productos añadidos
productRoutes.get("/latest", async (req, res) => {
  try {
    const products = await getLastestProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Ruta para traer todos los productos de una tienda por id
productRoutes.get("/allProductsStore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validar que idStore sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(id)) {
      return res
        .status(400)
        .json({ error: "Invalid parameter. It must be a valid UUID." });
    }
    const products = await getAllProductsByStoreId(id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Ruta para modificar los datos de un producto
productRoutes.put("/update", async (req,res) => {
  try {
    const data = req.body;
    const productData = await modifyProduct(data);
    return res.status(200).json(productData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = productRoutes;
