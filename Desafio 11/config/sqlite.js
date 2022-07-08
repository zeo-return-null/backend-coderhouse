const Knex = require("knex").default;
const moment = require("moment");

const options = {
	filename: "../ecommerce.sqlite",
};

const knex = Knex({
	client: "sqlite3",
	connection: options,
});

const init = async () => {
	await knex.schema.dropTableIfExists("mensajes");
	await knex.schema.createTable("mensajes", (table) => {
		table.increments("id").primary().notNullable();
		table.string("author", 30).notNullable();
		table.string("text", 240).notNullable();
		table.dateTime("date").notNullable();
	});

	const fechaActual = moment();
	const formatFecha = fechaActual.format("DD/MM/YYYY HH:MM:SS");

	await knex("mensajes").insert([
		{ 
			author: "paco", 
			text: "Wow esto es un chat?", 
			date: formatFecha 
		},
		{ 
			author: "maria", 
			text: "Asi parece, increible", 
			date: formatFecha 
		},
		{ 
			author: "El pepe", 
			text: "nah nah nah, EPICO", 
			date: formatFecha 
		},
	]);

	console.log(await knex.from("mensajes").select("*"));
	await knex.destroy();
};

init();
