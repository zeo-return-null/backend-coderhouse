const fs = require("fs");


class Container {
	constructor(name) {
		this.fileName = name;
		this.countID = 0;
		this.content = [];
		this.initialize();
	}

	async initialize() {
		//Lee el archivo y lo convierte en un array
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
		//Escribe el archivo
		await fs.promises.writeFile(
			this.fileName,
			JSON.stringify(this.content)
		);
	}

	save(object) {
		//Agrega un nuevo objeto al archivo
		this.countID++;
		object["id"] = this.countID;
		this.content.push(object);
		this.write();
		return `El id del objeto añadido es ${this.countID}.`;
	}

	update(id, obj) {
		//Actualiza el objeto con el id buscado
		const index = this.content.findIndex((objT) => objT.id == id);
		obj.id = this[index].id;
		this.content[index] = obj;
		return obj;
	}

	getById(id) {
		//Busca el objeto con el id buscado
		let result;
		if (this.content !== []) {
			result = this.content.find((x) => x.id === id);
			if (result === undefined) {
				result = null;
			}
		} else {
			result = "El archivo está vacío";
		}
		return result;
	}

	getAll() {
		return this.content;
	}

	deleteById(id) {
		//Elimina el objeto con el id buscado
		let result;
		if (this.content !== []) {
			let newContent = this.content.filter((x) => x.id !== id);
			this.content = newContent;
			this.write();
			result = `El producto fue eliminado`;
		} else {
			result = `El archivo está vacío`;
		}
		return result;
	}

	async deleteAll() {
		//Elimina todos los objetos del archivo
		this.content = await this.content.splice(0, this.content.length);
		this.write();
	}
}

module.exports = Container;
