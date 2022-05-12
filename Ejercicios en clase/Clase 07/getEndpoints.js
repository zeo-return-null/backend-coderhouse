const express = require('express');
const PORT = 8080;

const app = express();

const frase = 'hola estan, como mundo?';

const server = app.listen(PORT, () => {
	console.log("Servidor http saboreando en el puerto: ", server.address().port);
});

app.get('/api/frase', (req, res) => {
	res.send({frase : frase})
});

app.get('/api/letras/:num', (req, res) => {
	const position = parseInt(req.params.num);
	if (isNaN(position)) return res.status(400).send({error: "el parametro ingresado no es numerico."});

	if (position > frase.length) {
		res.status(404).send({error: "el parametro ingresado es mayor que la cantidad de letras en la frase."});
	}
	else {
		let searchChar;
		searchChar = frase.charAt(position-1);
		res.send({letra : searchChar});
	}
})

app.get('/api/palabras/:num', (req, res) => {
	const position = parseInt(req.params.num);
	if (isNaN(position)) return res.status(404).send({error: "el parametro ingresado no es numerico."})
	const searchArray = frase.split(' ');
	if (position > searchArray.length) {
		res.send({error: "el parametro ingresado es mayor que la cantidad de palabras en la frase."});
	}
	else {
		let searchWord = searchArray[position-1];
	res.send({palabra: searchWord});
	}
});