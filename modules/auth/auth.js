const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

function validarLongitud(fecha) {
    if (fecha < 10) {
        return `0${fecha}`;
    } else {
        return fecha;
    }
}

module.exports = {
    async isAdmin(req, res, next) {
        if (req.user.perm == "Admin"){
            next();
        }else{
            res.redirect("/misgrupos");
        };
    },

    async isUsuario(req, res, next) {
        if (req.user.perm == "Usuario") {
            next();
        } else {
            res.redirect("/admin-index");
        }
    },

    async isAuthenticated(req, res, next) {
        if (req.cookies.jwt) {
            try {
                const decodificada = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    env.JWT_SECRETO
                );
                if (decodificada.permiso == "Usuario") {
                    pool.query(
                        "SELECT * FROM musuario WHERE id_usu = ?",
                        [decodificada.id],
                        (error, results) => {
                            if (!results) {
                                res.redirect("/login");
                            }
                            req.user = results[0];
                            req.user.perm = "Usuario";

                            req.user.fec_nac =
                                req.user.fec_nac.getFullYear() +
                                "-" +
                                validarLongitud(
                                    req.user.fec_nac.getMonth() + 1
                                ) +
                                "-" +
                                validarLongitud(req.user.fec_nac.getDate());

                            return next();
                        }
                    );
                }
                if (decodificada.permiso == "Admin") {
                    pool.query(
                        "SELECT * FROM madministrador WHERE id_Adm = ?",
                        [decodificada.id],
                        (error, results) => {
                            if (!results) {
                                res.redirect("/login");
                            }
                            req.user = results[0];
                            req.user.perm = "Admin";
                            return next();
                        }
                    );
                }
            } catch (error) {
                console.log(error);
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    },

//isAuthenticatedVisitantes sirve para renderizar aquellas rutas que se pueden ver como visitante, me refiero a el index,login, sign-up etc.
// Pero una vez iniciada session no deberia de poder consultarse mas que nada por ux y
    async isAuthenticatedVisitantes(req, res, next) {
        if (req.cookies.jwt) {
            try {
                const decodificada = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    env.JWT_SECRETO
                );
                if (decodificada.permiso == "Usuario") {
                    pool.query(
                        "SELECT * FROM musuario WHERE id_usu = ?",
                        [decodificada.id],
                        (error, results) => {
                            if (results) {
                                res.redirect("/misgrupos");
                            }
                            req.user = results[0];
                            req.user.perm = "Usuario";

                            req.user.fec_nac =
                                req.user.fec_nac.getFullYear() +
                                "-" +
                                validarLongitud(
                                    req.user.fec_nac.getMonth() + 1
                                ) +
                                "-" +
                                validarLongitud(req.user.fec_nac.getDate());

                            return next();
                        }
                    );
                }
                if (decodificada.permiso == "Admin") {
                    pool.query(
                        "SELECT * FROM madministrador WHERE id_Adm = ?",
                        [decodificada.id],
                        (error, results) => {
                            if (results) {
                                res.redirect("/misgrupos");
                            }
                            req.user = results[0];
                            req.user.perm = "Admin";
                            return next();
                        }
                    );
                }
            } catch (error) {
                console.log(error);
                res.redirect("/login");
            }
        } else {
            next();
        }
    },


    async verificarpswd(req, res, next) {
        try {
            const user = req.user.cor_usu;
            const pass = req.body.pswd;


            if (!user || !pass) {
                res.redirect("verificarpswd");
            } else {
                pool.query(
                    "SELECT * FROM musuario WHERE cor_usu = ?",
                    [user],
                    async (error, results) => {
                        if (
                            results.length == 0 ||
                            !(await bcryptjs.compare(pass, results[0].con_usu))
                        ) {
                            res.redirect("verificarpswd");
                        } else {
                            next();
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    },
};
