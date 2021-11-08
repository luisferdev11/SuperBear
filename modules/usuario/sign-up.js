const express = require("express");
const passport = require("passport");
//const session = require('express-session');
const passportlocal = require("passport-local");
const { Passport } = require("passport");
const pool = require("../../database");
const app = express();
var router = express.Router();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

router.use(passport.initialize());


router.post(
    "/sign-up", async (req, res) => {
        const { email } = req.body;
        const { nombre } = req.body;
        const { fecha } = req.body;
        const { Password2 } = req.body;
        const { SelectAlcaldia } = req.body;
        const { genero } = req.body;

        let newUser = [email,
            nombre,
            fecha,
            Password2,
            SelectAlcaldia,
            genero];
        try {

        await pool.query("INSERT INTO musuario (cor_usu, nom_usu, fec_nac, con_usu, id_alc, id_sex) VALUES (?,?,?,?,?,?)", newUser);
            res.render("iniciarSesion");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    });

router.get("/sign-up", (req, res) => {
    res.render("registro");
});
module.exports = router;