const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: '',
  database: "acompana"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Exito conectando con Base de Datos");
});

module.exports = connection;