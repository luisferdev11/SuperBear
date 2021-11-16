const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async signUp(req, res) {
        const { email } = req.body;
        const { nombre } = req.body;
        const { fecha } = req.body;
        const { Password2 } = req.body;
        const { SelectAlcaldia } = req.body;
        const { genero } = req.body;

        let passHash = await bcryptjs.hash(Password2, 8);

        let newUser = [email, nombre, fecha, passHash, SelectAlcaldia, genero];
        try {
            await pool.query(
                "INSERT INTO musuario (cor_usu, nom_usu, fec_nac, con_usu, id_alc, id_sex) VALUES (?,?,?,?,?,?)",
                newUser
            );
            res.render("iniciarSesion");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },

    async login(req, res) {
        try {
            const user = req.body.username;
            const pass = req.body.password;

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
                            const id = results[0].id_usu;
                            const token = jwt.sign(
                                { id: id },
                                env.JWT_SECRETO,
                                {
                                    expiresIn: env.JWT_TIEMPO_EXPIRA,
                                }
                            );

                            console.log(
                                "TOKEN: " + token + " para el USUARIO : " + user
                            );

                            const cookiesOptions = {
                                expires: new Date(
                                    Date.now() +
                                        env.JWT_COOKIE_EXPIRES *
                                            24 *
                                            60 *
                                            60 *
                                            1000
                                ),
                                httpOnly: true,
                            };
                            res.cookie("jwt", token, cookiesOptions);
                            res.redirect("Misgrupos");
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    },

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
    logout(req, res) {
        res.clearCookie("jwt");
        return res.redirect("/");
    },
};
