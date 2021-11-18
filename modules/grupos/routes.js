const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// GET

router.get("/misgrupos", auth.isAuthenticated, (req, res) => {
    res.render("consultarGrupos");
});
router.get("/nuevogrupo", (req, res) => {
    res.render("ingresar-crearGrupo", { error: "" });
});
router.get("/miembrosdegrupo", controller.miembrosdegrupo);
router.get("/consultarmiembros", controller.consultarmiembros);
//POST

router.post("/ingresargrupo", controller.ingresargrupo);
router.post("/nuevogrupo", controller.nuevogrupo);

module.exports = router;
