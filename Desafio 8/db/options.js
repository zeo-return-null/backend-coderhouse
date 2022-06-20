const path = require("path");
let sqlitePath = path.join(__dirname, "ecommerce.sqlite");

const optionsSqlite = {
	client: "sqlite3",
	connection: {
		filename: sqlitePath,
	},
};

const optionsMySQL = {
	host: "localhost",
	user: "root",
	port: "3306",
	password: "",
	database: "ecommerce",
};

module.exports = { optionsMySQL, optionsSqlite };
