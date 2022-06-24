# Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.


La resolución de la consiga se encuentra en instructions.md 
Se detalla paso a paso como se realiza cada inciso y su respectivo comando.

---

- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

- Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

- Listar todos los documentos en cada colección.

- Mostrar la cantidad de documentos almacenados en cada una de ellas.

- Realizar un CRUD sobre la colección de productos:

- - Agregar un producto más en la colección de productos 

- - Realizar una consulta por nombre de producto específico:

- - - Listar los productos con precio menor a 1000 pesos.

- - - Listar los productos con precio entre los 1000 a 3000 pesos.

- - - Listar los productos con precio mayor a 3000 pesos.

- - - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

- - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

- - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

- - Borrar los productos con precio menor a 1000 pesos 

- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.