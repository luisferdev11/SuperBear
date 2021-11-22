const express = require("express");
const router = express.Router();

const controller = require("./controller");
const auth = require("../auth/auth");

// GET

router.get(
    "/misgrupos",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.misgrupos
);
router.get("/nuevogrupo", auth.isAuthenticated, (req, res) => {
    res.render("ingresar-crearGrupo", { error: "" });
});
router.get(
    "/miembrosdegrupo/:grupo",
    auth.isAuthenticated,
    controller.miembrosdegrupo
);
router.get(
    "/consultarmiembros/:grupo",
    auth.isAuthenticated,
    controller.consultarmiembros
);
//POST

router.post("/ingresargrupo", auth.isAuthenticated, controller.ingresargrupo);
router.post("/nuevogrupo", auth.isAuthenticated, controller.nuevogrupo);

router.get("/delete/:grupo/:id", auth.isAuthenticated, controller.delete);
router.get("/deletegroup/:grupo", auth.isAuthenticated, controller.deletegroup);
router.get(
    "/abandonargrupo/:grupo/:id",
    auth.isAuthenticated,
    controller.abandonargrupo
);
module.exports = router;
