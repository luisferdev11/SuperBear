//aqui van lo relacionado con la adicción y eliminacion de miembros de grupo
const express = require("express");
//const session = require('express-session');
const pool = require("../../database");
var router = express.Router();


router.get("/miembros", (req, res) => {
    res.render("consultarMiembrosDeGrupo-miembroDeGrupo");
    
});
router.get("/consultarmiembros", (req, res) => {
    res.render("consultarMiembrosyCodigoDeGrupo-administadorDeGrupo");

    
});
module.exports = router;