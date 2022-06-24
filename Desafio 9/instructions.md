# Crear collecciones 

db.createCollection('mensajes')
db.createCollection('productos')

# Añadir 10 docs de productos y 10 de mensajes

db.productos.insertMany([
	{title: 'goma de borrar', price: 120, stock: 20, thumbnail: 'aquiVaUnURL'},
    {title: 'lapiz lyra rembrandt 2b', price: 580, stock: 101, thumbnail: 'aquiVaUnURL'},
    {title: 'lapiz lyra rembrandt 6b', price: 900, stock: 99,thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo parker vector', price: 1280, stock: 30, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma parker vector', price: 1700, stock: 5, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma lamy safari', price: 2300, stock: 1, thumbnail: 'aquiVaUnURL'},
    {title: 'pluma inoxcrom', price: 2860, stock: 25,thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo lamy 2000', price: 3350, stock: 33, thumbnail: 'aquiVaUnURL'},
    {title: 'boligrafo lamy imporium', price: 4320, stock: 69,thumbnail: 'aquiVaUnURL'},
    {title: 'pluma pilot vanishing point', price: 4990, stock: 777, thumbnail: 'aquiVaUnURL'},
 ])

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

# Se listan los docs

## primero de mensajes
db.mensajes.find().pretty();
db.mensajes.find().count();

## luego de productos 

db.productos.find().pretty();
db.productos.find().count();
