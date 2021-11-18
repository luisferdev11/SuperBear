const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// GET

router.get("/misgrupos", auth.isAuthenticated, (req, res) => {
    res.render("consultarGrupos", { user: req.user });
});
router.get("/nuevogrupo", auth.isAuthenticated, (req, res) => {
    res.render("ingresar-crearGrupo", { error: "" });
});
router.get(
    "/miembrosdegrupo",
    auth.isAuthenticated,
    controller.miembrosdegrupo
);
router.get("/consultarmiembros", controller.consultarmiembros);
//POST

router.post("/ingresargrupo",auth.isAuthenticated, controller.ingresargrupo);
router.post("/nuevogrupo",auth.isAuthenticated, controller.nuevogrupo);

module.exports = router;
