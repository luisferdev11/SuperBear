const express = require("express");
const router = express.Router();

// Router placeholder para poder abrir los archivos como ejs

router.get("/consultarRutinas", (req, res) => {
    res.render("consultarRutinas");
});

router.get("/crearRutinas", (req, res) =>{
    res.render("crearRutinas");
});

router.get("/editarRutinas", (req, res) =>{
    res.render("editarRutinas");
});

module.exports = router;