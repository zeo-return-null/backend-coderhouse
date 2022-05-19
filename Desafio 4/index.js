const express = require("express");
const app = express();
const productRouter = require("./productRouter.js");
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/productos", productRouter);

app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});
