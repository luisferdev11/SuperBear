const express = require("express");
const router = express.Router();

const controller = require("./productos");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/CrearProducto/:id_lis", auth.isAuthenticated, controller.ConsultarCatalogo);
router.get('/ConsultarProductos/:id_lis', controller.ConsultarProductos);

// AQUI VAN LOS POST

router.post("/CrearProducto/:id_lis", controller.CrearProducto);

module.exports = router;