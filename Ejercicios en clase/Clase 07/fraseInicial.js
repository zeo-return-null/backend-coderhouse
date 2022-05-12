const express = require('express');
const app = express();
const PORT = 8080;

const fraseInicial = "Bienvenidos al Himalaya";
const palabras = fraseInicial.split(' ');

app.get('api/frase', (req, res) => {
	res.send(palabras.join(' '));
})

app.get('api/palabras/:pos', (req, res) => {
	const position = parseInt(req.params.pos);
	res.send(palabras[position]);
})

app.post('api/palabras', (req, res) => {
	const palabraAgregar = req.body.palabras;
	palabras.push(palabraAgregar);
	res.json({
		agregada: palabraAgregar,
		pos: palabras.length-1,
	})
})

app.put('apit/palabras/:pos', (req, res) => {
	const position = parseInt(req.params.pos);

})

app.delete('api/palabras/:pos', (req, res) => {

})

const server = app.listen(PORT, () => {
	console.log("Servidor http saboreando en el puerto: ", server.address().port);
});