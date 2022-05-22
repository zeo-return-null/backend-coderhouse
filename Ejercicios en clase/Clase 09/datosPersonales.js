const express = require('express');
const { engine } = require('express-handlebars');


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", server.address().port);
});

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'index.hbs',}));

app.set('views', './hbs_views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('main', {
		nombre: "Joan",
		apellido: "Reverte",
		edad: 999,
		email: "tucorreo@electronico.com",
		telefono: "No vas a conseguir mi numero tan facil xd",
	});
});

