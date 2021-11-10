const express = require("express");
const passport = require("passport");
//const session = require('express-session');
const passportlocal = require("passport-local");
const { Passport } = require("passport");
const pool = require("../../database");
var router = express.Router();


router.use(passport.initialize());

passport.use(
    new passportlocal(async function (username, password, done) {
        if (username.length > 0 && password.length > 0) {
            try {
                const identificador = await pool.query(
                    "SELECT id_usu FROM musuario WHERE cor_usu = ?",
                    [username]
                );
                const User = await pool.query(
                    "SELECT cor_usu FROM musuario WHERE cor_usu = ?",
                    [username]
                );
                const pass = await pool.query(
                    "SELECT con_usu FROM musuario WHERE cor_usu = ?",
                    [username]
                );
                const nombre = await pool.query(
                    "SELECT nom_usu FROM musuario WHERE cor_usu = ?",
                    [username]
                );
                const idpass = await identificador[0].id_usu;
                const namepass = await nombre[0].nom_usu;

                if (username == User[0].cor_usu && password == pass[0].con_usu)
                    return done(null, { id: idpass, name: namepass });
            } catch (error) {
                console.log(error);
                done(null, false);
            }
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const identificador = await pool.query(
        "SELECT id_usu FROM musuario WHERE id_usu = ?",
        [id]
    );
    const nombre = await pool.query(
        "SELECT nom_usu FROM musuario WHERE id_usu = ?",
        [id]
    );
    const idpass = await identificador[0].id_usu;
    const namepass = await nombre[0].nom_usu;

    done(null, { id: idpass, name: namepass });
});
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/Misgrupos",
        failureRedirect: "/login",
    })
);
router.get("/login", (req, res) => {
    res.render("iniciarSesion");
    //res.sendFile(path.join(__dirname, '/views/iniciarSesion.html'));
});
module.exports = router;
