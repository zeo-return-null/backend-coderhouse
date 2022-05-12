const express = require('express');
const parse = require('nodemon/lib/cli/parse');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log("Servidor http saboreando en el puerto: ", server.address().port);
});


app.get('/api/sumar/:numUno/:numDos', (req, res) => {
	const suma = parseInt(req.params.numUno) + parseInt(req.params.numDos);
	res.send({suma});
})

app.get('api/sumar', (req, res) => {
	const suma = parseInt(req.query.num1 ) + parseInt(req.query.num2);
	res.send({suma});
})

app.get('api/operacion/:operacion', (req, res) => {
	const numeros = req.params.operacion.split('+');
	const suma = parseInt(numeros[0]) + parseInt(numeros[1]);
	res.send({suma});
});

app.post('/api', (req, res) => {
	res.send("Ok Post");
});

app.put('/api', (req, res) => {
	res.send("ok put");
});

app.delete('/api', (req, res) => {
	res.send('ok delete');
});