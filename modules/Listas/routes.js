const express = require("express");
const router = express.Router();

const controller = require("./listas");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/consultarlistas/:id_grp", controller.ConsultarListas);
router.get("/crearlista/:id_grp", controller.grupo);
router.get('/BorrarLista/:id_lis', controller.borrarLista);
router.get('/DuplicarLista/:id_lis/:id_grp', controller.DuplicarLista);


// AQUI VAN LOS POST

router.post("/crearlista", controller.crearLista);


module.exports = router;