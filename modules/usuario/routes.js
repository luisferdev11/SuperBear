const express = require("express");
const router = express.Router();

const controller = require("./controller");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/", controller.isAuthenticated, (req, res) => {
    res.render("index");
});

router.get("/sign-up", (req, res) => {
    res.render("registro");
});

router.get("/login", (req, res) => {
    res.render("iniciarSesion");
});

// AQUI VAN LOS POST

router.post("/sign-up", controller.signUp);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

module.exports = router;
