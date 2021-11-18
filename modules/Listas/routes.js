const express = require("express");
const router = express.Router();

const controller = require("./listas");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/consultarlistas", controller.ConsultarListas);

router.get("/crearlista", auth.isAuthenticated, (req, res) => {
    res.render("crearListaDeGrupo");
});


// AQUI VAN LOS POST

router.post("/crearlista", controller.crearLista);

router.post("/consultarlistas/:id", controller.borrarLista);
router.post("/consultarlistas/:id", controller.DuplicarLista);

module.exports = router;