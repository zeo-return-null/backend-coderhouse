const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer, Socket } = require("socket.io");
const handlebars = require("express-handlebars");
const Container = require("./container.js");
const fs = require('fs');

const app = express();
const httpserver = new HttpServer(app);
const socketSv = new SocketServer(httpserver);
const PORT = 8080;

let products = [];
let messages = [];
const productsContainer = new Container(__dirname + "/public/data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


socketSv.on('connection', (socket) => {

	const data = fs.readFileSync('./public/data/messages.json');
    messages = JSON.parse(data);
	
	productsContainer.getAll().then((result) => {
		products = result;
		socket.emit('new_event', products, messages);
	})

	socket.on('new_product', (product) => {
		async function saveProduct(productArg) {
			await productsContainer.save(productArg);
			const result = await productsContainer.getAll();
			products = result;
			socketSv.sockets.emit('new_event', products, messages);
		}
		saveProduct(product);
	});
	socket.on('new_message', (message) => {             
	messages.push(message);
	fs.promises.writeFile('./public/data/messages.json', JSON.stringify(messages, null, 2));                           
	socketSv.sockets.emit('new_event', products, messages); 
	}); 
});

httpserver.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});