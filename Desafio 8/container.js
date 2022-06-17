const Knex = require("knex").default;

class Container {
	constructor(config, table) {
		this.knex = Knex({
			client: "mysql2",
			connection: config,
		});
		this.table = table;
	}

	// Funcion para guardar un producto
	async save(obj) {
		try {
			await this.knex(this.table).insert([
				{
					title: obj.title,
					price: obj.price,
					thumbnail: obj.thumbnail,
				},
			]);
			obj.id = await this.knex(this.table).max("id");

			return obj.id;
		} catch (error) {
			throw error;
		}
	}

	// Obtener todos los productos de la lista
	async getAll() {
		try {
			const array = await this.knex.from(this.table).select("*");
			return array;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Container;
