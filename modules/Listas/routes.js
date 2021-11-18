const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/", auth.isAuthenticated, (req, res) => {
    res.render("index");
});

router.get("/consultarlistasdegrupo", (req, res) => {
    res.render("consultarListasDeGrupo");
});

// AQUI VAN LOS POST

router.post("/", controller.signUp);

router.post("/login", controller.login);

module.exports = router;