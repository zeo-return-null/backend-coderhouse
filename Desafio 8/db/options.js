const path = require('path');
let sqlitePath = path.join(__dirname,'db','ecommerce.sqlite');

const optionsSqlite = {
  client: "sqlite3",
  connection: {
    filename: sqlitePath
  }
};

const optionsMySQL = {
  host: "localhost",
  user: "root",
  port: "3307",
  password: "root",
  database: "test_db"
};


module.exports = { optionsMySQL, optionsSqlite};