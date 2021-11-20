const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const { setNoticia } = require("./noticias");
const controller = require('./noticias');

router.get("/consultarNoticias-usuario", auth.isAuthenticated, controller.getNoticias);

// Admin
// Se debe de cambiar por adminIsAuth
router.get("/admin-consultarNoticias", auth.isAuthenticated, controller.getNoticiasAdmin);

router.get("/crearNoticia", auth.isAuthenticated, (req, res) => {
    res.render("admin-crearNoticia");
});

router.post("/crearNoticia", auth.isAuthenticated, controller.setNoticia);
router.get("/borrarNoticia/:id", auth.isAuthenticated, controller.borrarNoticia);
router.get("/editarNoticia/:id", auth.isAuthenticated, controller.redirectEditar);
router.post("/editarNoticia/:id", auth.isAuthenticated, controller.editarNoticia)
module.exports = router;