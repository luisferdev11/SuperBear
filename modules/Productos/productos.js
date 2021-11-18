const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async CrearProducto(req, res) {
        const id = req.user.id_usu;
        const { nombre } = req.body;
        const {Marca} = req.body;
        const {Super} = req.body;
        const {Depa} = req.body;
        const {cantidad} = req.body;
        const {unidad} = req.body;
        const {precio} = req.body;
        const {Notas} = req.body;

        let newList = [nombre];
        try {
            await pool.query(
                "INSERT INTO ELista (id_eli, nom_pro, id_mar, id_sup, id_dep, id_uni, can_pro, precio_pro, notas_pro, id_tip, id_esp) VALUES (?,?,?,?,?,?,?,?,?,?,1)",
                newList
            );
            const {id_lista} = await pool.query(
                "select id from mlista where id_lis = (select MAX(id) from mlista)",
                
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
    }
};