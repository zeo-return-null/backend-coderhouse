const express = require("express");
const Container = require('./container.js');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 8080;
const products = new Container(__dirname + "/data/products.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
	console.log("Servidor http escuchando en el puerto: ", PORT);
});

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials"
    })
)

app.set('views', './views');
app.set('views engine', 'hbs');

app.get('/', (req, res) => {
    let content = products.content;
    return res.render('hbs/index.hbs', {content});
})

app.post("/productos", (req, res) => {
    products.save(req.body);
    let content = products.content;
    let boolean = content.length !==0;
    return res.render('hbs/products.hbs', {list: content, showList: boolean});
});

app.get("/productos", (req, res) => {
    let content = products.content;
    let boolean = content.length !==0;
    return res.render('hbs/products.hbs', {
        list: content, showList: boolean});
});

