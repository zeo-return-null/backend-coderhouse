const Knex = require("knex").default;

class MensajesSqlite {
	constructor(options, table) {
		this.knex = Knex(options);
		this.table = table;
	}
	// Guarda el mensaje
	async save(obj) {
		try {
			console.log(`insertando mensaje: ${obj}`);
			await this.knex(this.table).insert([
				{ author: obj.author, text: obj.text, date: obj.date },
			]);
		} catch (error) {
			throw error;
		}
	}

	// Devuelve todos los mensajes de la tabla
	async getAll() {
		try {
			const array = await this.knex.from(this.table).select("*");
			return array;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = MensajesSqlite;
