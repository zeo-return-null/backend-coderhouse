const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));


const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);
});

app.post('/datos', (req, res) => {
	res.send(req.body);
});
