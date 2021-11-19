const express = require("express");
const router = express.Router();

const controller = require("./listas");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/consultarlistas/:id", controller.ConsultarListas);

router.get("/crearlista/:id", auth.isAuthenticated, (req, res) => {
    res.render("crearListaDeGrupo");
});
router.get('/BorrarLista/:id', controller.borrarLista);
router.get('/DuplicarLista/:id', controller.DuplicarLista);


// AQUI VAN LOS POST

router.post("/crearlista/:id", controller.crearLista);

router.post("/consultarlistasB/:id", controller.borrarLista);
router.post("/consultarlistasD/:id", controller.DuplicarLista);

module.exports = router;