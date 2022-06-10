const express = require('express');
const { productRouter,cartRouter } = require('./routerController');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos',productRouter);
app.use('/carrito',cartRouter);

app.use((req, res, next) => {
    res.status(404).send({ error: 'No se encuentra la ruta' });
})

app.listen(PORT, () => {
    console.log("Servidor http escuchando en el puerto: ", PORT);
})