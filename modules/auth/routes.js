const express = require("express");
const router = express.Router();

const auth = require("./auth");

router.get("/verificarpswd", auth.isAuthenticated, (req, res) => {
    res.render("verificarContraseña");
});

module.exports = router;
