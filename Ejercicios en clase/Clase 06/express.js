const express = require('express');
const moment = require('moment');


const app = express();
const PORT = 8080;
let visitas = 0;


const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);

}) 
server.on("error", error => console.log("error en el servidor ", error));

app.get('/', (req, res) => {
	res.send(`<h1 style="color: red;"> Bienvenido a Jurassic Park, digo al servidor de Express </h1>
	<h3>El color del texto es azul, ¿acaso sos daltonico?</h3>
	`);
})

app.get('/ping', (req, res, next) => {
	res.send('pong');
})

app.get('/visitas', (req, res, next) => {
	visitas++;
	res.send(`Esta ruta ha sido visitada ${visitas} veces `);
})

app.get('/fyh', (req, res, next) => {
	res.send({fyh: moment().format("D/M/YYYY H:mm:ss")})
})

app.get('/zombies', (req, res, next) => {
	res.send('OH NO LLEGARON LOS ZOMBIES DEL 404');
})
