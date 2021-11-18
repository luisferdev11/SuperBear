const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async crearLista(req, res) {
        const id = req.user.id_usu;
        const { nombre } = req.body;
        const {idg} = 1;

        let newList = [nombre];
        try {
            await pool.query(
                "INSERT INTO mlista (nom_lis, fec_lis, id_esl, tot_list) VALUES (?,CURDATE(),1,0.0)",
                newList
            );
            const {id_lista} = await pool.query(
                "select id from mlista where id = (select MAX(id) from mlista)",
                
            );
            let union = [idg, id_lista];
            await pool.query(
                "INSERT INTO ELista (id_grp, id_lis) VALUES (?,?)",
                union
            );
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },
    async editarLista(req, res){
        const id = req.user.id_usu;
        const {idl} = req.body;
        const { nombre } = req.body;
        
        let newList = [nombre, idl];
        try {
            await pool.query(
                "UPDATE MLista set nom_lis = ? where id_lis = ?",
                newList
            );
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },
    async borrarLista(req, res){
        const id = req.user.id_usu;
        const idl = req.body;
        try {
            await pool.query(
                "DELETE from MLista where id_lis = ?",
                idl
            );
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }, 
    async DuplicarLista(req, res){
        const id = req.user.id_usu;
        const idl = req.body;
        try {
            await pool.query(
                "DELETE from MLista where id_lis = ?",
                idl
            );
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }
};
