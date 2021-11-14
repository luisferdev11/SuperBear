const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
var router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const user = req.body.username;
        const pass = req.body.password;

        if (!user || !pass) {
            res.render("login", {
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
                    console.log(pass);
                    console.log(results[0].con_usu);
                    if (results.length == 0 || pass != results[0].con_usu) {
                        //     results.length == 0 ||
                        //     !(await bcryptjs.compare(pass, results[0].pass))
                        // ) {
                        res.render("login", {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Usuario y/o Password incorrectas",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: false,
                            ruta: "login",
                        });
                    } else {
                        //inicio de sesión OK
                        const id = results[0].id;
                        const token = jwt.sign(
                            { id: id },
                            process.env.JWT_SECRETO,
                            {
                                expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                            }
                        );
                        //generamos el token SIN fecha de expiracion
                        //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                        console.log(
                            "TOKEN: " + token + " para el USUARIO : " + user
                        );

                        const cookiesOptions = {
                            expires: new Date(
                                Date.now() +
                                    process.env.JWT_COOKIE_EXPIRES *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                            ),
                            httpOnly: true,
                        };
                        res.cookie("jwt", token, cookiesOptions);
                        res.render("login", {
                            alert: true,
                            alertTitle: "Conexión exitosa",
                            alertMessage: "¡LOGIN CORRECTO!",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 800,
                            ruta: "",
                        });
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
    //res.sendFile(path.join(__dirname, '/views/iniciarSesion.html'));
});
module.exports = router;
