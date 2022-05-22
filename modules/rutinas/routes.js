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

router.get("/consultarRutinas/:grupo",
    controller.consultarRutinas
);

router.get("/editarRutinas", (req, res) =>{
    res.render("editarRutinas");
});

module.exports = router;