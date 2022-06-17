const express = require("express");
const path = require('path');
const productRouter = express.Router();

let options_path = path.join(__dirname, 'db','options.js');
const { optionsMySQL } = require(options_path);

let Container = require("./container.js");
let products = new Container(optionsMySQL,'products');

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

async function getAllProducts(){
  const resultado = await products.getAll();
  return resultado;
}

async function saveProduct(obj){
  await products.save(obj);
}

//devuelve todos los productos
productRouter.get("/", async (req, res) => {
  try {
    res.send(await products.getAll());
  } catch (error) {
    throw new Error("Hubo un error al listar todos los products");
  }
});

//devuelve solo el producto que necesito con el id pasado por get
productRouter.get("/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let obj = products.getById(id);

    res.send(obj);
  } catch (error) {
    throw new Error("Hubo un error al listar el producto seleccionado");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    let obj = {};

    obj.title = req.body.title;
    obj.price = req.body.price;
    obj.thumbnail = req.body.thumbnail;
    let id = await products.save(obj);

    res.send({ id });

    console.log(`Nuevo producto id: ${id} `);
  } catch (error) {
    throw new Error("Hubo un error al agregar el producto");
  }
});

productRouter.put("/:id", (req, res) => {
  try {
    let obj = {};
    obj.id = parseInt(req.params.id);
    obj.title = req.body.title;
    obj.price = req.body.price;
    obj.thumbnail = req.body.thumbnail;

    let id = products.updateById(obj);

    res.send(id);
    console.log(`Modificado producto id: ${id} `);
  } catch (error) {
    throw new Error("Hubo un error al actualizar el producto");
  }
});

productRouter.delete("/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let obj = products.deleteById(id);

    res.send(obj);
  } catch (error) {
    throw new Error(`Hubo un error al borrar el producto`);
  }
});

module.exports = {productRouter, getAllProducts, saveProduct};
