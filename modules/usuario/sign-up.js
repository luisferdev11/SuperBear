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
passport.use(
    new passportlocal(async function (req, done) {
        /*console.log("hola peruano");
        const { email } = req.body;
        const { nombre } = req.body;
        const { fecha } = req.body;
        const { contraseña2 } = req.body;
        const { SelectAlcaldia } = req.body;
        const { genero } = req.body;
        console.log(email, nombre, fecha, contraseña2, SelectAlcaldia, genero);
        let newUser = {
            email,
            nombre,
            fecha,
            contraseña2,
            SelectAlcaldia,
            genero,
        };
        // Saving in the Database
        const result = await pool.query(
            "INSERT INTO musuario (cor_usu, nom_usu, fec_nac, con_usu, id_alc, id_sex) VALUES (?, ?, ? , ?, ?, ?)",
            newUser
        );*/
        return done(null);
        done(null, false);
    })
);
router.post(
    "/sign-up",
    passport.authenticate("local", {
        successRedirect: "/login",
        failureRedirect: "/",
    })
);
router.get("/sign-up", (req, res) => {
    res.render("registro");
});
module.exports = router;
