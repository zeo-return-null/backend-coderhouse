# Crear collecciones 

```
db.createCollection('mensajes');
db.createCollection('productos');
```
# Añadir 10 docs de productos y 10 de mensajes

```
 db.productos.insertMany([
	{title: 'goma de borrar', price: 120, stock: 20, thumbnail: 'aquiVaUnURL'},
    {title: 'lapiz lyra rembrandt 2b', price: 580, stock: 10, thumbnail: 'aquiVaUnURL'},
    {title: 'lapiz lyra rembrandt 6b', price: 900, stock: 21,thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo parker vector', price: 1280, stock: 30, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma parker vector', price: 1700, stock: 5, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma lamy safari', price: 2300, stock: 1, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma inoxcrom', price: 2860, stock: 25,thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo lamy 2000', price: 3350, stock: 33, thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo lamy imporium', price: 4320, stock: 69,thumbnail: 'aquiVaUnURL'},
    {title: 'pluma pilot vanishing point', price: 4990, stock: 7, thumbnail: 'aquiVaUnURL'},
 ]);
```
```

db.mensajes.insertOne({author: 'Juan', text: 'esta es la base de datos de un chat?', timestamp: new Date() });

db.mensajes.insertOne({author: 'Morgana', text: 'Asi parece, Sherlock', timestamp: new Date() });

db.mensajes.insertOne({author: 'Gisela', text: 'Como funciona?', timestamp: new Date() });

db.mensajes.insertOne({author: 'Juan', text: 'No tengo idea lo que estoy haciendo aqui', timestamp: new Date() });

db.mensajes.insertOne({author: 'Morgana', text: 'Sos el admin de la db y no sabes que haces? mejor me voy', timestamp: new Date() });

db.mensajes.insertOne({author: 'Juan', text: 'Pará no va a explotar nada, o quizas si', timestamp: new Date() });

db.mensajes.insertOne({author: 'Gisela', text: 'No sabia que las bases de datos podian explotar', timestamp: new Date() });

db.mensajes.insertOne({author: 'Juan', text: 'Era un chiste, pero ahora me entró la duda de que pueda ocurrir', timestampe: new Date() });

db.mensajes.insertOne({author: 'Gisela', text: 'Ay no, mejor dejemos de plagar de mensajes hasta que aprendas a manejar bien esto', timestamp: new Date() });

db.mensajes.insertOne({author: 'Juan', text: 'Suena como un buen plan', timestamp: new Date() });
```

# Se listan los docs en cada coleccion y su cantidad

## primero de mensajes
```
db.mensajes.find().pretty();
db.mensajes.find().count();
```
## luego de productos 
```
db.productos.find().pretty();
db.productos.find().count();
```

# Se realizan operaciones CRUD en la coleccion de productos

## Se agrega un producto a la coleccion
```
db.productos.insertOne({title: 'tinta pilot ironshizuku', price: 4999, stock: 11, thumbnail: 'aquiVaUnURL'});
```
## Se realizan consulta consultas

- Se listan productos con precio menor a 1000.
```
db.productos.find({'price':{$lt:1000}});
```

- Se listan productos con precio entre 1000 y 3000.
```
db.productos.find({$and:[{'price':{$gte:1000}},{'price':{$lte:3000}}]});
```
- Se listan productos con precio mayor a 3000.
```
db.productos.find({'price':{$gt:3000}});
```
- Se lista el tercer producto mas barato.
```
db.productos.find({}).sort({'price':1}).skip(2).limit(1);
```
- Se modifica el stock de todos los productos a 100.
```
db.productos.updateMany({ 'price':{ $gte: 0 }}, { $set:{  'stock': 100 }});
```
- Se cambia el stock a 0 de los productos con un precio mayor a 4000.
```
db.productos.updateMany({ 'price':{ $gt:4000 }}, { $set:{ 'stock':0 }});
```
- Se eliminan los productos con precio menor a 1000.
```
db.productos.deleteMany({ 'price':{ $lt:1000 }});
```

# Se crea un usuario solo para lectura
``` 
db.createUser({ 
	"user": "pepe", 
	"pwd": "asd456",
	"roles": [{
		role: "read",
		db: "ecommerce"
	}]});
```
Para testear el usuario se inicio la db con los siguientes comandos
```
mongod --dbpath path_a_db

use ecommerce

db.auth('pepe', 'asd456')
```
Una vez hecho esto, se logró leer los productos pero no modificarlos.