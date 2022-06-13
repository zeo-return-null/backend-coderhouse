const express = require('express');
const path = require('path');
const moment = require('moment');
const cartRouter = express.Router();
const { getProduct } = require('./productRouter');

const cartContainer = require('../classes/cartContainer');
const cartPath = path.join(__dirname, '..', '/data/cart.json');
let carts = new cartContainer(cartPath);

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: true }));

// Devuelve los productos del carrito
cartRouter.get('/', async (req, res) => {
	try {
		res.send(await carts.getAll());
	}
	catch (error) {
		throw new Error("Hubo un error al mostrar los carritos");
	}
});

cartRouter.get('/:id/productos', async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		console.log(`carrito buscado: ${id}`);
		let obj = await carts.getCartById(id);
		console.log(obj);
		if (obj.error) {
			res.send(obj);
		} else {
			if (obj[0].products == undefined) {
				res.send(obj);
			} else {
				res.send(obj[0].products);
			}
		};
	}
	catch (error) {
		throw new Error("Hubo un error al listar los productos del carrito seleccionado");
	};
});

cartRouter.post('/:id/productos', async (req, res) => {
	try {
		let obj = {};
		obj.id = parseInt(req.params.id);
		let productId = parseInt(req.body.productId);
		obj.products = await getProduct(productId);
		if (obj.products.error) {
			res.send(obj.products);
		} else {
			await carts.addProductToCartById(obj);
			let cart = await carts.getCartById(obj.id);
			res.send({ cart });
			console.log(`Nuevo producto agregado al carrito con el ID: ${object.id}`);
		}
	}
	catch (error) {
		throw new Error(`Hubo un error al agregar el producto con el ID: ${product.id} al carrito`);
	};
});

cartRouter.post('/', async (req, res) => {
	try {
		let obj = {};
		obj.timestamp = moment();
		obj.products = [];
		let id = await carts.createCart(obj);
		res.send({ id });
		console.log(`Nuevo carrito con el ID: ${id}`);
	}
	catch (error) {
		throw new Error(`Hubo un error al agregar el producto con el ID: ${id} al carrito`);
	};
});

cartRouter.delete('/:id', async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let obj = await carts.deleteCartById(id);
		res.send(obj);
	}
	catch (error) {
		throw new Error(`Hubo un error al borrar el carrito`);
	}
});

cartRouter.delete('/:id/productos/:id_producto', async (req, res) => {
	try {
		let deleteProduct = {};
		let id = parseInt(req.params.id);
		let id_product = parseInt(req.params.id_producto);
		deleteProduct.id_product = id_product;
		deleteProduct.id = id;
		let obj = await carts.deleteProductFromCartById(deleteProduct);
		res.send(obj);
	}
	catch (error) {
		throw new Error(`Hubo un error al borrar el producto`);
	}
});

module.exports = { cartRouter };