const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
var router = express.Router();

const { env } = require("../../credenciales");

router.post("/login", async (req, res) => {
    try {
        const user = req.body.username;
        const pass = req.body.password;

        if (!user || !pass) {
            res.render("iniciarSesion", {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: "login",
            });
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
                        const token = jwt.sign({ id: id }, env.JWT_SECRETO, {
                            expiresIn: env.JWT_TIEMPO_EXPIRA,
                        });
                        //generamos el token SIN fecha de expiracion
                        //const token = jwt.sign({id: id}, env.JWT_SECRETO)
                        console.log(
                            "TOKEN: " + token + " para el USUARIO : " + user
                        );

                        const cookiesOptions = {
                            expires: new Date(
                                Date.now() +
                                    env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
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
});

router.get("/login", (req, res) => {
    res.render("iniciarSesion");
});

module.exports = router;
