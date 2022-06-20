const express = require("express");
const path = require("path");
const moment = require("moment");
const {
	productRouter,
	getAllProducts,
	saveProduct,
} = require("./productRouter.js");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const MensajesSqlite = require("./mensajes.js");
let optionsPath = path.join(__dirname, "db", "options.js");
const { optionsSqlite } = require(optionsPath);

const app = express();
const httpserver = new HttpServer(app);
const socketServer = new SocketServer(httpserver);
const PORT = 8080;

const tablaChat = "mensajes";
let chat = new MensajesSqlite(optionsSqlite, tablaChat);

let views_path = path.join(__dirname, "views");
app.use(express.static("public"));

app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);

app.set("views", views_path);
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);

app.get("/", (req, res) => {
	res.render("main");
});

socketServer.on("connection", async (socket) => {
	//emite los mensajes y productos actuales
	socket.emit("messages", await chat.getAll());
	socket.emit("products", await getAllProducts());

	socket.on("new_product", async (producto) => {
		saveProduct(producto);
		socketServer.sockets.emit("products", await getAllProducts());
	});

	socket.on("new_message", async (mensaje) => {
		const fechaActual = moment();
		mensaje.date = fechaActual.format("DD/MM/YYYY HH:MM:SS");
		await chat.save(mensaje);
		socketServer.sockets.emit("messages", await chat.getAll());
	});
});

httpserver.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});
