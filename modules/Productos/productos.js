const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {
    async CrearProducto(req, res) {
        const id = req.user.id_usu;
        const idl = req.id_lis;
        const { nombre } = req.body;
        const {Marca} = req.body;
        const {Super} = req.body;
        const {Depa} = req.body;
        const {cantidad} = req.body;
        const {unidad} = req.body;
        const {precio} = req.body;
        const {Notas} = req.body;

        let newP = [nombre, Marca, Super, Depa, cantidad, unidad, precio, Notas];
        try {
            const id_lista = await pool.query(
                "select id_eli from ELista where id_lis = ?",
                idl
            );
            await pool.query(
                "INSERT INTO DProducto (id_eli, nom_pro, id_mar, id_sup, id_dep, id_uni, can_pro, precio_pro, notas_pro, id_tip, id_esp) VALUES (?,?,?,?,?,?,?,?,?,?,1)",
                [id_lista, newP]
            );
            res.render("consultarProductosDeLista");
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }
};