const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async isAuthenticated(req, res, next) {
        if (req.cookies.jwt) {
            console.log(req.cookies.jwt);
            try {
                const decodificada = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    env.JWT_SECRETO
                );
                console.log(decodificada);
                pool.query(
                    "SELECT * FROM musuario WHERE id_usu = ?",
                    [decodificada.id],
                    (error, results) => {
                        if (!results) {
                            return next();
                        }
                        req.user = results[0];
                        console.log(`req.user es ${JSON.stringify(req.user)}`);
                        return next();
                    }
                );
            } catch (error) {
                console.log(error);
                return next();
            }
        } else {
            res.redirect("/login");
        }
    },
};
