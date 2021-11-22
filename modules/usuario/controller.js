const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { env } = require("../../credenciales");

async function getSex(id_sex) {
    const sexo = await pool.query(
        `SELECT * FROM csexo WHERE id_sex =${id_sex}`
    );
    return sexo[0].sexo.trim();
}

module.exports = {
    async signUp(req, res) {
        const { email } = req.body;
        const { nombre } = req.body;
        const { fecha } = req.body;
        const { Password2 } = req.body;
        const { SelectAlcaldia } = req.body;
        const { genero } = req.body;

        //funcion hash para encriptar la contraseña de tal forma que sea seguro y lo podamos recuperar despues
        let passHash = await bcryptjs.hash(Password2, 8);

        let newUser = [email, nombre, fecha, passHash, SelectAlcaldia, genero];
        try {
            await pool.query(
                "INSERT INTO musuario (cor_usu, nom_usu, fec_nac, con_usu, id_alc, id_sex) VALUES (?,?,?,?,?,?)",
                newUser
            );
            res.render("iniciarSesion");
        } catch (err) {
            res.redirect("/error");
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
                            pool.query(
                                "SELECT * FROM madministrador WHERE Cor_Adm = ?",
                                [user],
                                async (error, results) => {
                                    console.log(results);
                                    if (
                                        !results ||
                                        !(await bcryptjs.compare(
                                            pass,
                                            results[0].Con_Adm
                                        ))
                                    ) {
                                        res.render("iniciarSesion");
                                    } else {
                                        //inicio de sesión OK
                                        const id = results[0].id_Adm;
                                        const token = jwt.sign(
                                            { id: id, permiso: "Admin" },
                                            env.JWT_SECRETO,
                                            {
                                                expiresIn:
                                                    env.JWT_TIEMPO_EXPIRA,
                                            }
                                        );

                                        console.log(
                                            "TOKEN: " +
                                                token +
                                                " para el ADMIN : " +
                                                user
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
                                        res.cookie(
                                            "jwt",
                                            token,
                                            cookiesOptions
                                        );
                                        res.redirect("admin-index");
                                    }
                                }
                            );
                        } else {
                            //inicio de sesión OK
                            const id = results[0].id_usu;
                            const token = jwt.sign(
                                { id: id, permiso: "Usuario" },
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

    logout(req, res) {
        res.clearCookie("jwt");
        return res.redirect("/");
    },

    async datosperfil(req, res, next) {
        try {
            pool.query(
                "SELECT * FROM calcaldia WHERE id_alc = ?",
                [req.user.id_alc],
                async (error, results) => {
                    if (!results) {
                        next();
                    }

                    req.user.alc = results[0].nom_alc.trim();
                    req.user.sexo = await getSex(req.user.id_sex);
                    console.log(
                        `req.user.alc es ${req.user.alc} y ${req.user.sexo}`
                    );
                    next();
                }
            );
        } catch (error) {
            console.error(error);
            next();
        }
    },

    async actualizardatos(req, res) {
        const { email } = req.body;
        const { nombre } = req.body;
        const { Password2 } = req.body;
        const { fecha } = req.body;
        const { SelectAlcaldia } = req.body;
        const { genero } = req.body;

        console.log(Password2);

        //funcion hash para encriptar la contraseña de tal forma que sea seguro y lo podamos recuperar despues
        let passHash = await bcryptjs.hash(Password2, 8);

        let newUser = [email, nombre, fecha, passHash, SelectAlcaldia, genero];
        try {
            await pool.query(
                `UPDATE musuario 
                SET cor_usu = ?, nom_usu = ?, fec_nac = ?, con_usu = ?, id_alc =?, id_sex = ? 
                WHERE id_usu = ${req.user.id_usu}`,
                newUser
            );
            res.redirect("misgrupos");
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
};
