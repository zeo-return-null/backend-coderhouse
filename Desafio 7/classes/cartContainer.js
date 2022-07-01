const fs = require("fs");

/**
 * Convertir el archivo a array
 * @param {string} fileName 
 * @returns array
 */
 const fileToArray = async (fileName) => {
    try {
        return JSON.parse(await fs.promises.readFile(fileName));
    } catch (error) {
		console.log("Algo salio mal al volver un array el archivo.");
		throw error;
	}
};

/**
 * Convertir el array en un archivo 
 * @param {string} fileName
 * @param {obj} array
 */
const arrayToFile = async (fileName, arr) => {
	try {
		 fs.promises.writeFile(fileName, JSON.stringify(arr));
	}
	catch (error) {
		console.log("Algo salio mal al volver un archivo el array.");
		throw error;
	}
};

/**
 * Funcion para crear archivo vacio
 * @param {string} fileName 
 */
const createFile = async (fileName) => {
    try {
        await fs.promises.writeFile(fileName, "[]");
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

class cartContainer {
	constructor(fileName) {
		this.file = fileName;
	}

	// Funcion para guardar un producto
	async createCart(product) {
		try {
			await fileExist(this.file);
			let index = 0;
			let array = await fileToArray(this.file);
			if (array.length == 0) {
				index = 1;
			} else {
				index = array[array.length - 1].id + 1;
			}
			product.id = index;
			// Se agrega el producto y se guarda el archivo retornando el ID del producto
			array.push(product);
			await arrayToFile(this.file, array);
			return product.id;
		} catch (error) {
			console.log("Algo salio mal al guardar el producto.");
			throw error;
		}
	}

	// Funcion para buscar un producto por su ID
	async getCartById(id) {
		try {
			// Revisa existencia de archivo luego busca en la lista de productos para retornar el producto ingresado
			await fileExist(this.file);
			let array = await fileToArray(this.file);
			array = array.filter((product) => {
				return product.id == id;
			});
			if (array[0] == undefined) {
				return { error: "Parece que no existe el carrito."};
			} else {
				return array;
			}
		} catch (error) {
			console.log("Algo salio mal al buscar el producto.");
			throw error;
		}
	}

	async updateById(product) {
		try {
			await fileExist(this.file);
			let array = await fileToArray(this.file);
			let productIndex = array.findIndex((productX) => productX.id == product);
			if (productIndex == -1) {
				return { error: "No se ha encontrado el producto."};
			}
			else {
				array[productIndex].title = product.title;
				array[productIndex].price = product.price;
				array[productIndex].thumbnail = product.thumbnail;
				await arrayToFile(this.file, array);
				return { status: "Producto actualizado con exito."};
			};
		}
		catch (error) {
			console.log("Algo salio mal al actualizar el producto.");
			throw error;
		}
	}
	// Funcion para eliminar un producto por su ID
	async deleteById(id) {
		try {
			// Revisa existencia de archivo, luego filtra la lista de productos para eliminar el producto ingresado
			await fileExist(this.file);
			let array = await fileToArray(this.file);
			let product = this.getById(id);
			if(product.error == "") {
				return product;
			}
			else {
				array = array.filter((product) => {
					return product.id !== id;
				});
				await arrayToFile(this.file, array);
				return { IdProductDeleted: id };
			}
			
		} catch (error) {
			console.log("Algo salio mal al eliminar un producto.");
			throw error;
		}
	}

	// Obtener todos los productos de la lista
	async getAll() {
		try {
			// Revisa existencia del archvo, luego retorna el archivo convertido en objeto por consola
			await fileExist(this.file);
			return fileToArray(this.file);
		} catch (error) {
			console.log(
				"Algo salio mal al querer mostrar todos los productos."
			);
			throw error;
		}
	}

	// Eliminar la lista de productos
	async deleteAll() {
		try {
			await createFile(this.file);
		} catch (error) {
			console.log("Algo salio mal al eliminar la lista de productos");
			throw error;
		}
	}
}

module.exports = cartContainer;