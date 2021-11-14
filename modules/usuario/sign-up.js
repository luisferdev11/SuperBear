const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const express = require("express");
//const session = require('express-session');
const pool = require("../../database");
var router = express.Router();

router.post("/sign-up", async (req, res) => {
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
});

router.get("/sign-up", (req, res) => {
    res.render("registro");
});
module.exports = router;
