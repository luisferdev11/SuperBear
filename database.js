const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./credenciales");
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        console.log("Error base de datos:");
        console.log(err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Se cerró la conexión a la base de datos.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("La base de datos tiene muchas conexiones");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Se rechazó la conexión a la base de datos");
        }
    }
    if (connection) {
        connection.release();
        console.log("DB está conectada");
    }

    return;
});
pool.query = promisify(pool.query);
module.exports = pool;
