const fs = require("fs");

/**
 * Convertir el Json a Objeto 
 * @param {json} json 
 * @returns object
 */
const jsonToObject = (json) => {
    try {
        if (json.length > 0) {            
            return JSON.parse(json);
        } else {            
            return JSON.parse('[]');
        }
    } catch (error) {
		console.log("Algo salio mal al volver un objecto el JSON.");
		throw error;
	}
};

// Convertir el objecto a Json 
/**
 * 
 * @param {object} obj 
 * @returns json
 */
const objectToJson = (object) => {
	try {
		return JSON.stringify(object);
	}
	catch (error) {
		console.log("Algo salio mal al volver JSON el objeto.");
		throw error;
	}
};

/**
 *  Funcion para leer el archivo
 * @param {string} fileName 
 */
const readFile = async (fileName) => {
	try {
		return await fs.promises.readFile(fileName, 'utf-8');
	}
	catch (error) {
		console.log("Algo salio mal al leer el archivo.");
		throw error;
	}
};

/**
 * Funcion para escribir el archivo
 * @param {string} fileName 
 * @param {json} json 
 * @returns 
 */
const writeFile = async (fileName, json) => {
	try {
		await fs.promises.writeFile(fileName, json);
	}
	catch (error) {
		console.log("Algo salio mal al escribir el archivo.");
		throw error;
	}
};

/**
 * Funcion para crear archivo 
 * @param {string} fileName 
 */
const createFile = async (fileName) => {
    try {
        await fs.promises.writeFile(fileName, "");
    } catch (error) {
        throw error;
    }
};

/**
 *  Funcion para revisar si existe el archivo y en caso de que no, crearlo llamando a la funcion de crear archivo
 * @param {string} fileName 
 */
 const fileExist = async (fileName) => {
	if (fs.existsSync(fileName) == false) {
		await createFile(fileName);
	}
};


class Container {

	constructor(file) {
		this.file = file;
	}

	// Funcion para guardar un producto
	async save(product) {
		try{
			// Revisa existencia de archivo, asigna inicio del contador de ID caso contrario toma el ultimo asignado
			await fileExist(this.file);
			let productId = 0;
			let productsArray = jsonToObject(await readFile(this.file));
			if (productsArray.length == 0) {
				productId = 1;
			} 
			else {
				productId = productsArray[productsArray.length -1].id + 1;
			}
			product.id = productId;
			// Se agrega el producto y se guarda el archivo retornando el ID del producto 
			productsArray.push(product);
			await writeFile(this.file, objectToJson(productsArray));
			return product.id;
		}
		catch (error) {
			console.log("Algo salio mal al guardar el producto.");
			throw error;
		}

	}

	// Funcion para buscar un producto por su ID
	async getById(id) {
		try {
			// Revisa existencia de archivo luego busca en la lista de productos para retornar el producto ingresado
			await fileExist(this.file);
			let productsArray = jsonToObject(await readFile(this.file));
			productsArray = productsArray.filter((product) => {
                return product.id == id;
            });

            if (productsArray.length == 0) {
                return null;
            } else {
                return productsArray[0];
            }
		}
		catch (error) {
			console.log("Algo salio mal al buscar el producto.");
			throw error;
		}
	}

	// Funcion para eliminar un producto por su ID
	async deleteById(id) {
		try {
			// Revisa existencia de archivo, luego filtra la lista de productos para eliminar el producto ingresado
			await fileExist(this.file);
			let productsArray = jsonToObject(await readFile(this.file));
			productsArray = productsArray.filter((product) => {
				return product.id !== id;
			});
			await writeFile(this.file, objectToJson(productsArray));
		}
		catch (error){
			console.log("Algo salio mal al eliminar un producto.");
			throw error;
		}
	}

	// Obtener todos los productos de la lista
	async getAll() {
		try {
			// Revisa existencia del archvo, luego retorna el archivo convertido en objeto por consola
			await fileExist(this.file);
			return jsonToObject(await readFile(this.file));
		}
		catch (error) {
			console.log("Algo salio mal al querer mostrar todos los productos.");
			throw error;
		}
	}

	// Eliminar la lista de productos
	async deleteAll() {
		try {
			await createFile(this.file);
		}
		catch (error) {
			console.log("Algo salio mal al eliminar la lista de productos");
			throw error;
		}
	}
}

class Product {
	constructor(title, price, thumbnail = "http://esta es una URL ficticia") {
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
		this.id = 0;
	}
}

async function Test() {
	

	const productos = new Container("./productos.txt");

	let producto = new Product('Producto Generico 1', 20, "http:// esta es una URL");
	await productos.save(producto);
	console.log("Se guardo producto generico 1")

	producto = new Product('Producto Generico 2', 25, "http:// esta es una URL");	
	await productos.save(producto);
	console.log("Se guardo producto generico 2")

	producto = new Product('Producto Generico 3', 10, "http:// esta es una URL");
	await productos.save(producto);
	console.log("Se guardo producto generico 3")

	producto = new Product('Producto Generico 4', 15, "http:// esta es una URL");
	await productos.save(producto);
	console.log("Se guardo producto generico 4")

	let id = 1;
	console.log(`Se busca el producto con el id ${id}` + objectToJson(await productos.getById(id)));	

    id = 4;
    console.log(`Se elimina al producto con el id ${id}` + objectToJson(await productos.deleteById(id)));
    
	console.log(`Se traen todos los productos \n` + objectToJson(await productos.getAll()));

	console.log(`Se eliminan todos los productos \n` + objectToJson(await productos.deleteAll()));
	}


Test()

