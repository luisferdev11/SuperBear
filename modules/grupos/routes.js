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
router.get("/nuevogrupo", auth.isUsuario, auth.isAuthenticated, (req, res) => {
    res.render("ingresar-crearGrupo", { error: "" });
});
router.get(
    "/miembrosdegrupo/:grupo",
    auth.isUsuario,
    auth.isAuthenticated,
    controller.miembrosdegrupo
);
router.get(
    "/consultarmiembros/:grupo",
    auth.isAuthenticated,
    auth.isUsuario,

    controller.consultarmiembros
);
//POST

router.post(
    "/ingresargrupo",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.ingresargrupo
);
router.post(
    "/nuevogrupo",
    auth.isAuthenticated,
    auth.isUsuario,

    controller.nuevogrupo
);

router.get(
    "/delete/:grupo/:id",
    auth.isAuthenticated,
    auth.isUsuario,

    controller.delete
);
router.get(
    "/deletegroup/:grupo",
    auth.isAuthenticated,
    auth.isUsuario,

    controller.deletegroup
);
router.get(
    "/abandonargrupo/:grupo/:id",
    auth.isAuthenticated,
    auth.isUsuario,

    controller.abandonargrupo
);
module.exports = router;
