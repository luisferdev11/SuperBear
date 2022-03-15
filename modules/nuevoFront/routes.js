const express = require("express");
const router = express.Router();

// Router placeholder para poder abrir los archivos como ejs

router.get("/consultarRutinas", (req, res) => {
    res.render("consultarRutinas");
});

module.exports = router;