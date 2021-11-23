const express = require("express");
const router = express.Router();

const controller = require("./productos");
const auth = require("../auth/auth");

// NO SE COMO QUIERAN PONERLOS, SI POR CASO DE USO, POR METODO O EN ARCHIVOS DISTINTOS

// Se debe verificar que exista una sesion
router.get(
    "/CrearProducto/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.ConsultarCatalogo
);
router.get(
    "/CrearProductoPredeterminado/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.ConsultarPredeterminados
);
router.get(
    "/ProductoPredeterminado/:id_prod/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.CrearPredeterminados
);
router.get(
    "/ConsultarProductos/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.ConsultarProductos
);
router.get(
    "/editarProductoDeLista/:id_prod/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.redirectEditar
);
router.get(
    "/borrarProductoLista/:id_prod/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.borrarProducto
);
router.get(
    "/estadoProductoLista/:id_prod/:id_lis",
    auth.isAuthenticated,
    auth.isUsuario,
    controller.Estado
);

// AQUI VAN LOS POST

router.post(
    "/CrearProducto/:id_lis",
    auth.isAuthenticated,
    controller.CrearProducto
);
router.post(
    "/editarProductosDeLista/:id_prod/:id_lis",
    auth.isAuthenticated,
    controller.editarProducto
);

module.exports = router;
