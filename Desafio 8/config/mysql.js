const Knex = require("knex").default;
const path = require("path");
let optionsPath = path.join(__dirname, "..", "options.js");
const { optionsMySQL } = require("../options.js");
console.log(optionsMySQL);
const knex = Knex({
	client: "mysql2",
	connection: optionsMySQL,
});

const init = async () => {
	await knex.schema.dropTableIfExists("productos");
	await knex.schema.createTable("productos", (table) => {
		table.increments("id").primary().notNullable();
		table.string("title", 80).notNullable();
		table.float("price").notNullable();
		table.string("thumbnail", 250).notNullable();
	});
	await knex("productos").insert([
		{ 
			title: "Lapicera", 
			price: 150.5, 
			thumbnail: `http://www.google.com` 
		},
		{ 
			title: "Lapiz", 
			price: 50.65, 
			thumbnail: `http://www.bing.com` 
		},
		{
			title: "Goma de borrar",
			price: 20.75,
			thumbnail: `http://www.yahoo.com`,
		},
	]);

	console.log(await knex.from("productos").select("*"));
	await knex.destroy();
};

init();
