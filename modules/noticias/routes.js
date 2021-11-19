const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const controller = require('./noticias');

router.get("/consultarNoticias-usuario", auth.isAuthenticated, controller.getNoticias);

module.exports = router;