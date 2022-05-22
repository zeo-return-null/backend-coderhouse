const express = require('express');
const { Router } = express;
const app = express();
const PORT = 8080;

const routerMascotas = express.Router();
const routerPersonas = express.Router();
const listaMascotas = [];
const listaPersonas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);
});

server.on("error", (error) => (console.log('error en el servidor', error)));

app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

routerMascotas.get('/', (req, res) => {
	console.log(req.body);
	res.send({mascotas: listaMascotas});
});

routerPersonas.get('/', (req, res) => {
	res.send({personas: listaPersonas});
});

routerMascotas.post('/', (req, res) => {
	console.log(req.body);
	listaMascotas.push(req.body);
	res.send('body impreso');
});

routerPersonas.post('/', (req, res) => {
	console.log(req.body);
	listaPersonas.push(req.body);
	res.send('body impreso');
});