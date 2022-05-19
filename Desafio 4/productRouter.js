const express = require("express");
const productRouter = express.Router();

let Container = require("./container.js");
let products = new Container();

productRouter.use(express.urlencoded({ extended: true }));
productRouter.use(express.json());

//devuelve todos los productos
productRouter.get("/", (req, res) => {
	try {
		res.send(products.getAll());
	} catch (error) {
		throw new Error("Algo salio mal al mostrar todos los productos");
	}
});

// Mostrar un producto
productRouter.get("/:id", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let product = products.getById(id);
		res.send(product);
	} catch (error) {
		throw new Error("Algo salio mal buscando un producto");
	}
});

// Añadir producto
productRouter.post("/", (req, res) => {
	try {
		let product = {};
		product.title = req.body.title;
		product.price = req.body.price;
		product.thumbnail = req.body.thumbnail;
		let id = products.save(product);
		res.send({ id });
		console.log(`Nuevo producto: ${id} `);
	} catch (error) {
		throw new Error("Algo salio mal al agregar un producto");
	}
});

//Actualizar producto
productRouter.put("/:id", (req, res) => {
	try {
		let product = {};
		product.id = parseInt(req.params.id);
		product.title = req.body.title;
		product.price = req.body.price;
		product.thumbnail = req.body.thumbnail;
		let id = products.updateById(product);
		res.send(id);
		console.log(`Se cambio el producto: ${id} `);
	} catch (error) {
		throw new Error("Algo salio mal al actualizar un producto");
	}
});

//Borrar un producto
productRouter.delete("/:id", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let product = products.deleteById(id);
		res.send(product);
	} catch (error) {
		throw new Error(`Algo salio mal al borrar un producto`);
	}
});

module.exports = productRouter;
