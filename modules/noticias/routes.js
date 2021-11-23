const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const { setNoticia } = require("./noticias");
const controller = require('./noticias');

router.get("/consultarNoticias-usuario", auth.isAuthenticated, controller.getNoticias);

// Admin
router.get("/admin-consultarNoticias", auth.isAuthenticated, auth.isAdmin, controller.getNoticiasAdmin);

router.get("/crearNoticia", auth.isAuthenticated, auth.isAdmin, (req, res) => {
    res.render("admin-crearNoticia");
});

router.post("/crearNoticia", auth.isAuthenticated, auth.isAdmin, controller.setNoticia);
router.get("/borrarNoticia/:id", auth.isAuthenticated, auth.isAdmin, controller.borrarNoticia);
router.get("/editarNoticia/:id", auth.isAuthenticated, auth.isAdmin, controller.redirectEditar);
router.post("/editarNoticia/:id", auth.isAuthenticated, auth.isAdmin, controller.editarNoticia)
module.exports = router;