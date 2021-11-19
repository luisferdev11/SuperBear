const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/sign-up", (req, res) => {
    res.render("registro");
});

router.get("/login", (req, res) => {
    res.render("iniciarSesion");
});

router.get("/logout", auth.isAuthenticated, controller.logout);

router.get("/datos-perfil", auth.isAuthenticated, controller.datosperfil);

router.get("/editarperfil", (req, res) => {
    res.render("consultarDatosPerfil");
});

// AQUI VAN LOS POST

router.post("/sign-up", controller.signUp);

router.post("/login", controller.login);

module.exports = router;
