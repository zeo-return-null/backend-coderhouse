const fs = require('fs');
const express = require('express');
const Container =  require('./container');
const path = require('path');


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);
});

const file = path.resolve(__dirname, 'productos.txt');
let products = new Container(file);

app.get('/productos', async (req, res) => {
	let arr = await products.getAll();
	res.send(arr);
})

app.get('/productoRandom', async (req, res) => {
	let arr = await products.getAll();
	let randomProd = arr[Math.floor((Math.random() * (arr.length)))];
	res.send(randomProd);
})


