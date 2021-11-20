const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// GET

router.get("/misgrupos", auth.isAuthenticated, controller.misgrupos);
router.get("/nuevogrupo", auth.isAuthenticated, (req, res) => {
    res.render("ingresar-crearGrupo", { error: "" });
});
router.get("/miembrosdegrupo/:grupo",auth.isAuthenticated,controller.miembrosdegrupo);
router.get("/consultarmiembros/", auth.isAuthenticated,controller.consultarmiembros);
//POST

router.post("/ingresargrupo", auth.isAuthenticated, controller.ingresargrupo);
router.post("/nuevogrupo", auth.isAuthenticated, controller.nuevogrupo);

router.get("/delete/:id", auth.isAuthenticated, controller.delete);

module.exports = router;
