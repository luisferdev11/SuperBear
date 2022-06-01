const express = require("express");
const router = express.Router();

router.get("/producto", (req, res) =>{
    res.render("productoNuevo");
});

module.exports = router;