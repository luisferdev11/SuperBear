const express = require("express");
const router = express.Router();

const controller = require("./productos");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

router.get("/CrearProducto", auth.isAuthenticated, (req, res) => {
    res.render("agregarProductoALista");
});


// AQUI VAN LOS POST

router.post("/CrearProducto", controller.CrearProducto);

module.exports = router;