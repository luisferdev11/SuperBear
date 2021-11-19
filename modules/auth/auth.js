const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

function validarLongitud(mes) {
    if (mes < 10) {
        return `0${mes}`;
    } else {
        return mes;
    }
}

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

                        req.user.fec_nac =
                            req.user.fec_nac.getFullYear() +
                            "-" +
                            validarLongitud(req.user.fec_nac.getMonth() + 1) +
                            "-" +
                            validarLongitud(req.user.fec_nac.getDate());

                        console.log(req.user.fec_nac);
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

    async verificarpswd(req, res) {
        try {
            const user = req.user.cor_usu;
            const { pass } = req.body;

            console.log(user + pass);

            if (!user || !pass) {
                res.render("iniciarSesion");
            } else {
                pool.query(
                    "SELECT * FROM musuario WHERE cor_usu = ?",
                    [user],
                    async (error, results) => {
                        if (
                            results.length == 0 ||
                            !(await bcryptjs.compare(pass, results[0].con_usu))
                        ) {
                            res.render("iniciarSesion");
                        } else {
                            //inicio de sesión OK

                            res.redirect("Misgrupos");
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    },
};
