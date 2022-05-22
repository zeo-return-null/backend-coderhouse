const express = require('express');


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);
});

server.on("error", (error) => (console.log('error en el servidor', error)));

const primerMiddleware = (req, res, next) => {
	console.log("Pase por el primero");
	next();
}

const segundoMiddleware = (req, res, next) => {
	console.log("Pase por el segundo");
	next();
}

app.use((req, res, next) => {
	console.log("pase por el middleware de nivel aplicacion");
	next();
})

app.get('/ruta1', primerMiddleware, (req, res) => {
	res.send('ruta1');
})

app.get('/ruta2', primerMiddleware, segundoMiddleware, (req, res) => {
	res.send('ruta2');
})

app.get('/ruta3', (req, res) => {
	next(new Error("Hubo un error."));
})