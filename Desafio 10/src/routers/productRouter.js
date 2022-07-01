const express = require("express");
const path = require("path");
const productRouter = express.Router();
const moment = require("moment");
const productContainer = require("../classes/productContainer");
const productsPath = path.join(__dirname, "..", "data/products.json");
let products = new productContainer(productsPath);

productRouter.use(express.urlencoded({ extended: true }));
productRouter.use(express.json());

function getProduct(id) {
	return products.getById(id);
}
// Devuelve todos los productos
productRouter.get("/", async (req, res) => {
	try {
		res.send(await products.getAll());
	} catch (error) {
		throw new Error("Algo salio mal al mostrar los productos");
	}
});
// Buscar y mostrar un producto
productRouter.get("/:id", async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let product = await products.getById(id);
		res.send(product);
	} catch (error) {
		throw new Error("Algo salio mal buscando un producot por ID");
	}
});
// Añadir un producto
productRouter.post("/", async (req, res) => {
	try {
		if (req.body.isAdmin) {
			let product = {};
			product.title = req.body.title;
			product.price = req.body.price;
			product.thumbnail = req.body.thumbnail;
			product.timestamp = moment();
			let id = await product.save(product);
			res.send({ id });
			console.log(`Nuevo producto: ${id}`);
		} else {
			res.json({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
	} catch (error) {
		throw new Error("Algo salio mal al añadir un nuevo producto");
	}
});
// Editar un producto
productRouter.put("/:id", async (req, res) => {
	try {
		if (req.body.isAdmin) {
			let product = {};
			product.id = parseInt(req.params.id);
			product.title = req.body.title;
			product.price = req.body.price;
			product.thumbnail = req.body.thumbnail;
			let id = await products.updateById(product);
			res.send(id);
			console.log(`Se actualizo el producto con el id: ${id}`);
		} else {
			res.send({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
	} catch (error) {
		throw new Error("Algo salio mal al actualizar un producto");
	}
});
// Eliminar un producto
productRouter.delete("/:id", async (req, res) => {
	try {
		if (req.body.isAdmin) {
			let id = parseInt(req.params.id);
			let product = await products.deleteById(id);
			res.send(product);
		} else {
			res.json({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
	} catch (error) {
		throw new Error(
			`Algo salio mal al eliminar el producto con el ID: ${id}`
		);
	}
});

module.exports = { productRouter, getProduct };
