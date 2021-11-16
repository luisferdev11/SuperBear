//aqui van lo relacionado con la adicción y eliminacion de miembros de grupo
const express = require("express");
//const session = require('express-session');
const pool = require("../../database");
var router = express.Router();

router.get("/miembrosdegrupo", async (req, res) => {
    try {
        const grupo = 3;
        const id_miembros = await pool.query(
            "SELECT id_usu FROM egrupo WHERE id_grp = ?", [grupo]
        );
       
        var arrmiembros = [];
        var arrprivilegios=[];
        for (let i = 0; i < id_miembros.length; i++) {

            const miembro = id_miembros[i].id_usu;
            var datosmiembro = await pool.query("SELECT * FROM musuario WHERE id_usu = ?", [miembro]);
            arrmiembros.push(datosmiembro[0].nom_usu);
            arrprivilegios.push(id_miembros[i].id_priv);

        }

        res.render("consultarMiembrosDeGrupo-miembroDeGrupo", {miembros: arrmiembros,privilegio:arrprivilegios });



    } catch (error) {
        console.log(error);
        res.redirect("/error")
    }


});
router.get("/consultarmiembros", async (req, res) => {
    try {
        const grupo = 3;
        const id_miembros = await pool.query(
            "SELECT * FROM egrupo WHERE id_grp = ?", [grupo]
        );
        var arrmiembros = [];
        var arrprivilegios=[];
        for (let i = 0; i < id_miembros.length; i++) {

            const miembro = id_miembros[i].id_usu;
            var datosmiembro = await pool.query("SELECT * FROM musuario WHERE id_usu = ?", [miembro]);
            arrmiembros.push(datosmiembro[0].nom_usu);
            arrprivilegios.push(id_miembros[i].id_priv);

        }

        

        const codigo_grupo = await pool.query(
            "SELECT cod_grp FROM mgrupo WHERE id_grp = ?", [grupo]

        );
        const code = codigo_grupo[0].cod_grp;


        res.render("consultarMiembrosyCodigoDeGrupo-administadorDeGrupo", {
            data: code, miembros: arrmiembros,privilegio:arrprivilegios
        });
    } catch (error) {
        console.log("El id asignado no existe")
        res.redirect("/error");
    }





});
module.exports = router;