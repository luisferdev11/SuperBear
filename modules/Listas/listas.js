const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async crearLista(req, res) {
        const id = req.user.id_usu;
        const { nombre } = req.body;
        const {idg} = req.body;

        let newList = [nombre];
        try {
            await pool.query(
                "INSERT INTO mlista (nom_lis, fec_lis, id_esl, tot_list) VALUES (?,CURDATE(),1,0.0)",
                newList
            );
            const {id_lista} = await pool.query(
                "select id_lis from mlista where id_lis = (select MAX(id) from mlista)"
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
        const idl = req.params;
        try {
            await pool.query(
                "DELETE from MLista where id_lis = ?",
                idl
            );
            await pool.query(
                "DELETE from ELista where id_lis = ?",
                idl
            );
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }, 
    async ConsultarListas(req, res){
        const id = req.user.id_usu;
        const idg = req.params;
        try {
            const nomGrp = await pool.query(
                "SELECT nom_grp FROM MGrupo WHERE id_grp = ?",
                idg
            );
            const id_lista = await pool.query(
                "SELECT * FROM ELista WHERE id_grp = ?",
                idg
            );
            var arrlistas = [];
            for (let i = 0; i < id_lista.length; i++) {
                const lista = id_lista[i].id_lis;
                var datoslista = await pool.query(
                    "SELECT * FROM MLista WHERE id_lis = ?",
                    [lista]
                );
                arrlistas.push(datoslista[i]);
            }

            res.render("consultarListaDeGrupo", {
                listas: arrlistas,
                idg: idg,
                nombre: nomGrp
            });
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },
    async DuplicarLista(req, res){
        const id = req.user.id_usu;
        const idg = req.params;
        const idl = req.body;
        try {
            const {Clista} = await pool.query(
                "select * from mlista where id_lis = ?",
                idl
            );
            const {Plista} = await pool.query(
                "select * from DProducto where id_pro = ?",
                
            );
            const {Nombre} = Clista.nom_lis;
            await pool.query(
                "INSERT INTO mlista (nom_lis, fec_lis, id_esl, tot_list) VALUES (?,CURDATE(),1,0.0)",
                Nombre
            );
            const {id_lista} = await pool.query(
                "select id_lis from mlista where id = (select MAX(id) from mlista)",
                
            );
            let union = [idg, id_lista];
            await pool.query(
                "INSERT INTO ELista (id_grp, id_lis) VALUES (?,?)",
                union
            );
            const {id_elista} = await pool.query(
                "select id_eli from ELista where id = (select MAX(id) from mlista)",
                
            );
            for (let i = 0; i < Plista.length; i++) {
                const nombre = Plista[i].nom_pro;
                const marca = Plista[i].id_marca;
                const sup = plista[i].id_sup;
                const dep = plista[i].id_dep;
                const uni = plista[i].id_uni;
                const can = plista[i].can_pro;
                const precio = plista[i].precio_pro;
                const notas = plista[i].notas_pro;
                const tipo = plista[i].id_tip;

                var datoslista = await pool.query(
                    "INSERT INTO ELista (id_eli, nom_pro, id_mar, id_sup, id_dep, id_uni, can_pro, precio_pro, notas_pro, id_tip, id_esp) VALUES (?,?,?,?,?,?,?,?,?,?,1)",
                    [id_elista, nombre, marca, sup, dep, uni, can, precio, notas, tipo]
                );
            }
            res.render("consultarListaDeGrupo");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }
};
