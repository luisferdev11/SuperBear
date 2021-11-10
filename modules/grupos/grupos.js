const express = require("express");
//const session = require('express-session');
const pool = require("../../database");
var router = express.Router();


function generarCodigo() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let Cod = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        Cod += characters.charAt(Math.floor(Math.random() * charactersLength));

    }

    return Cod;

}
async function comprobarCodigo(codigo) {
    let respuesta ;
    let consultacod =await pool.query("SELECT cod_grp FROM mgrupo WHERE cod_grp=?", [codigo]);
    if (consultacod.length == 0) {
        respuesta = true;
    } else {
        respuesta = false;

    }
    return respuesta;
}
router.get("/Misgrupos", (req, res) => {
    res.render("consultarGrupos");
});
router.get("/nuevogrupo", (req, res) => {
    res.render("ingresar-crearGrupo");
});
router.post("/nuevogrupo", async (req, res) => {

    const { nombreGrupo } = req.body;


    //await pool.query("SELECT cod_grp FROM mgrupo WHERE cod_grp=?",)
    //for (let i = 0; i == 1;) {
    let codigo = generarCodigo();

    if (await comprobarCodigo(codigo) == true) {
        console.log("se le retorna la respuesta");
        let Arraycodigo = [
            nombreGrupo,
            codigo
        ];
        try {
            console.log(codigo.length);
            await pool.query("INSERT INTO mgrupo (nom_grp ,cod_grp) VALUES (?,?)", Arraycodigo);
            i = 1;
            res.render("consultarGrupos");
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    } else {
        res.render("error");
        console.log("No se genero el codigo de manera correcta")
    }
    //}


});
module.exports = router;