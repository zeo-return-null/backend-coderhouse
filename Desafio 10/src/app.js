const express = require("express");
const { productRouter } = require("./routers/productRouter.js");
const { cartRouter } = require("./routers/cartRouter");
const moment = require("moment");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

app.use(function (req, res) {
	// Solicitud no valida
	res.json({
		error: "-2",
		description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
	});
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Estoy escuchando ${port}`);
});
