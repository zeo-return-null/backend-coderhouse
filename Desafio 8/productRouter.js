const express = require("express");
const path = require("path");
const productRouter = express.Router();
let optionsPath = path.join(__dirname, "db", "options.js");
const { optionsMySQL } = require(optionsPath);

let Container = require("./container.js");
let productos = new Container(optionsMySQL, "productos");

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

async function getAllProducts() {
	const result = await productos.getAll();
	return result;
}

async function saveProduct(obj) {
	await productos.save(obj);
}

//devuelve todos los productos
productRouter.get("/", async (req, res) => {
	try {
		res.send(await productos.getAll());
	} catch (error) {
		throw new Error("Algo salio mal al mostrar todos los productos");
	}
});

//devuelve solo el producto que necesito con el id pasado por get
productRouter.get("/:id", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let obj = productos.getById(id);

		res.send(obj);
	} catch (error) {
		throw new Error("Algo salio mal al mostrar un producto");
	}
});

productRouter.post("/", async (req, res) => {
	try {
		let obj = {};

		obj.title = req.body.title;
		obj.price = req.body.price;
		obj.thumbnail = req.body.thumbnail;
		let id = await productos.save(obj);
		res.send({ id });
	} catch (error) {
		throw new Error("Algo salio mal al agregar un producto");
	}
});

productRouter.put("/:id", (req, res) => {
	try {
		let obj = {};
		obj.id = parseInt(req.params.id);
		obj.title = req.body.title;
		obj.price = req.body.price;
		obj.thumbnail = req.body.thumbnail;
		let id = productos.updateById(obj);
		res.send(id);
	} catch (error) {
		throw new Error("Algo salio mal al modificar un producto");
	}
});

productRouter.delete("/:id", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let obj = productos.deleteById(id);
		res.send(obj);
	} catch (error) {
		throw new Error(`Algo salio mal al borrar un producto`);
	}
});

module.exports = { productRouter, getAllProducts, saveProduct };
