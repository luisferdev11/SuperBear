const express = require("express");
const router = express.Router();

const auth = require("./auth");

router.get(
    "/verificarpswd",
    auth.isAuthenticated,
    auth.isUsuario,
    (req, res) => {
        res.render("verificarContrase├▒a");
    }
);

router.post(
    "/verificarpswd",
    auth.isAuthenticated,
    auth.verificarpswd,
    (req, res) => {
        res.redirect("editarperfil");
    }
);

module.exports = router;
