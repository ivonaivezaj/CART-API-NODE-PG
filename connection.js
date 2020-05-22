const { Pool } = require("pg");
const credentials = new Pool({
user: "postgres",
password: "11leonard",
host: "localhost",
port: 5432,
database: "ExpressShopDB",
ssl: false
});

module.exports = credentials;
