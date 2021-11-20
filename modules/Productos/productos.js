const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

async function getAllMarca() {
    const marca = await pool.query(
        `SELECT * FROM cmarca`
    );
    return marca[0].marca.trim();
}

async function getAllDepa() {
    const depa = await pool.query(
        `SELECT * FROM CDepartamento`
    );
    return depa[0].depa.trim();
}
async function getAllUni() {
    const unidad = await pool.query(
        `SELECT * FROM CUnidad`
    );
    return unidad[0].unidad.trim();
}

async function getAllSuper() {
    const Sup = await pool.query(
        `SELECT * FROM CSupermercado`
    );
    return Sup[0].Sup.trim();
}

module.exports = {
    async CrearProducto(req, res) {
        const id = req.user.id_usu;
        const idl = req.params;
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
    },async ConsultarCatalogo (req, res){
        try {
        const id = req.user.id_usu;
        const ideli = req.params;
        const Marca = await getAllMarca();
        const Depa = await getAllDepa();
        const Uni = await getAllUni();
        const Super = await getAllSuper();
        res.render("agregarProductoALista", { 
            id: ideli,
            Marca: Marca,
            Depa: Depa,
            Uni: Uni,
            Super: Super
        });
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },
    async ConsultarProductos (req, res){
        try {
        const idl = req.params.id_lis;
        const eli = await pool.query(
            "select id_eli from elista where id_lst = ?",
            [idl]
        );
        const grupo = await pool.query(
            "select id_grp from elista where id_lst = ?",
            [idl]
        );
        var id_e = [];
            for (let i = 0; i < eli.length; i++) {
                const miembro = eli[i].id_lst;
                id_e.push(miembro);
            }            
            var productos = [];
            for (let i = 0; i < id_e.length; i++) {
                const miembro = id_e[i];
                const list = await pool.query(
                    "select * from dproducto where id_eli = ?",
                    [miembro]
                    );
                productos.push(list[0]);
            }

            console.log(JSON.stringify(listas));

            res.render("consultarListasDeGrupo", {
                productos: productos,
                idlista: idl,
                grupo: grupo
            });
            
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }
};