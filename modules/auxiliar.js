const pool = require("../database");

module.exports = {
    async doesAttributeExist(input) {
        try {
            const marca = await pool.query(
                "SELECT * FROM cmarca where Marca like'%" + input + "%'"
            );
            if (marca) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },
};
