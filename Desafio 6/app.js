const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer, Socket } = require("socket.io");
const handlebars = require("express-handlebars");
const Container = require("./container.js");
const moment = require('moment'); 

const app = express();
const httpserver = new HttpServer(app);
const io = new SocketServer(httpserver);
const PORT = 8080;

const products = [];
const messages = [];
const productsContainer = new Container(__dirname + "/data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/views/layouts'));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		partialsDir: __dirname + "/public/views/partials",
	})
);

app.set("views", "./public/views");
app.set("views engine", "hbs");

app.get('/', (req, res) => {
	let productContent = productsContainer.content;
	let productBoolean = productContent.length !==0;
	res.render('layouts/main.hbs',
		{
			productList: productContent,
			showProducts: productBoolean,

		});
});

app.post("/productos", (req, res) => {
    productsContainer.save(req.body);
	let productContent = productsContainer.content;
	let productBoolean = productContent.length !==0;
    return res.render('layouts/main.hbs', 
		{
			productList: productContent,
			showProducts: productBoolean
		});
});


httpserver.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});

io.on('connection', (socket) => {

	const data = fs.readFileSync('./public/messages.json');
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
			io.sockets.emit('new_event', products, messages);
		}
		saveProduct(product);
	});
	socket.on('new_message', (message) => {             
	messages.push(message);
	fs.promises.writeFile('./public/mesagges.json', JSON.stringify(messages, null, 2));                           
	io.sockets.emit('new_event', product, messages); 
	}); 
});
