const express = require("express");
const Container = require("./container");

const app = express();
const PORT = 8080;
const products = new Container(__dirname + "/data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});

app.set('views', './views/ejs');
app.set('views engine', 'ejs');

app.get('/', (req, res) => {
    let content = products.content;
    return res.render('index.ejs', { content });
})

app.post("/productos", (req, res) => {
    products.save(req.body)
    let content = products.content;
    return res.render('products.ejs', { content });
});

app.get("/productos", (req, res) => {
    let content = products.content;
    return res.render('products.ejs', { content });
});
