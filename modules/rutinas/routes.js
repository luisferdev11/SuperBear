const express = require("express");
const router = express.Router();
const controller = require("./rutinas");
const auth = require("../auth/auth");

// Crear Rutina
router.get(
    "/crearRutina/:lista/:grupo",
    auth.isAuthenticated,
    controller.consultarNombre
);

router.post(
    "/crearRutina/:lista/:grupo",
    auth.isAuthenticated,
    controller.crearRutina
);

// Consultar Rutina
router.get(
    "/consultarRutinas/:grupo",
    auth.isAuthenticated,
    controller.consultarRutinas
);

// Borrar Rutina
router.get(
    "/borrarRutina/:rutina/:grupo",
    auth.isAuthenticated,
    controller.borrarRutina
);

// Editar Rutina
router.get(
    "/editarRutina/:rutina/:grupo",
    auth.isAuthenticated,
    controller.getEditarRutina
);

router.post(
    "/editarRutina/:rutina/:grupo",
    auth.isAuthenticated,
    controller.editarRutina
);

module.exports = router;
