const fs = require("fs");

class Container {
	constructor(name) {
		this.fileName = name;
		this.countID = 0;
		this.content = [];
		this.initialize();
	}

	async initialize() {
		try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log("Aún no hay archivo");
		}
	}

	async write() {
		await fs.promises.writeFile(
			this.fileName,
			JSON.stringify(this.content)
		);
	}

	/**
	 * Guarda agrega un producto
	 * @param {object} product
	 * @returns Id del producto
	 */
	async save(obj) {
		try{ 
			this.countID++;
			obj["id"] = this.countID;
			this.content.push(obj);
			this.write();
			return `El id del objeto añadido es ${this.countID}.`;
		}
		catch(error) {
			console.error(`Ha ocurrido un error: ${error}`);
		};
	}
	/**
	 * Busca un producto con el id ingreado y lo edita con el objecto ingresado
	 * @param {int} id
	 * @param {string} objeto
	 * @returns Devuelve el producto si existe
	 */
	async update(id, obj) {
		try {
			const index = this.content.findIndex((objP) => objP.id == id);
			obj.id = this[index].id;
			this.content[index] = obj;
			return obj;
		}
		catch(error) {
			console.error(`Ha ocurrido un error: ${error}`);
		};
	}
	/**
	 * Busca un producto
	 * @param {int} id
	 * @returns Devuelve el producto si existe
	 */
	async getById(id) {
		try{
			let result;
			if (this.content !== []) {
				result = this.content.find((x) => x.id === id);
				if (result === undefined) {
					result = null;
				}
			} else {
				result = "El archivo está vacío";
			}
			await result;
		}
		catch(error) {
			console.error(`Ha ocurrido un error: ${error}`);
		}		
	}
	/**
	 *
	 * @returns Devuelve todos los productos
	 */
	async getAll() {
		try {
			let data = JSON.parse(await fs.promises.readFile(this.fileName));
            return data;
        } catch (error) {
            console.error(`Ha ocurrido un error: ${error}`);
        }
	}
	/**
	 * Borra el producto con el id ingresado
	 * @param {int} id
	 */
	async deleteById(id) {
		try {
			let result;
			if (this.content !== []) {
				let newContent = this.content.filter((x) => x.id !== id);
				this.content = newContent;
				this.write();
				result = `El producto fue eliminado`;
			} else {
				result = `El archivo está vacío`;
			}
			await result;
		}
		catch(error) {
			console.error(`Ha ocurrido un error: ${error}`);
		};
	}
	/**
	 *
	 * @returns Elimina todos los productos en el contenedor
	 */
	async deleteAll() {
		this.content = await this.content.splice(0, this.content.length);
		this.write();
	}
}

module.exports = Container;
