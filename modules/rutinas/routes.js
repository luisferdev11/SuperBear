const express = require("express");
const router = express.Router();
const controller = require("./rutinas");


// Crear Rutina
router.get(
    "/crearRutina/:lista/:grupo",
    controller.consultarNombre
);

router.post(
    "/crearRutina/:lista/:grupo",
    controller.crearRutina
)

// Consultar Rutina
router.get(
    "/consultarRutinas/:grupo",
    controller.consultarRutinas
);

// Borrar Rutina
router.get(
    "/borrarRutina/:rutina/:grupo",
    controller.borrarRutina
);

// Editar Rutina
router.get(
    "/editarRutina/:rutina/:grupo",
    controller.getEditarRutina
);

router.post(
    "/editarRutina/:rutina/:grupo",
    controller.editarRutina
);

module.exports = router;