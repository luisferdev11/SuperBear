const express = require("express");
const router = express.Router();

const controller = require("./listas");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/consultarlistas/:id_grp", controller.ConsultarListas);
router.get("/crearlista/:id_grp", controller.grupo);
router.get("/Borrarlista/:id_lis/:id_grp", controller.borrarLista);
router.get('/Duplicarlista/:id_lis/:id_grp', controller.DuplicarLista);


// AQUI VAN LOS POST

router.post("/crearlista/:id_grp", controller.crearLista);


module.exports = router;