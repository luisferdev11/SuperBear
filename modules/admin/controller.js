const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { env } = require("../../credenciales");

//Funcion de Crear Producto Admin
module.exports = {
    async createDefaultObject(req, res) {
        const { nombrep } = req.body;
        const { departamento } = req.body;
        const { unidad } = req.body;

        let newProduct = [nombrep, departamento, unidad];
        try {
            // await pool.query(" INSERT INTO cdepartamento  (id_dep, nom_dep) VALUES (1,?)", departamento);
            //await pool.query("INSERT INTO cunidad (id_uni, unidad) VALUES (,?)", unidad);
            await pool.query(
                "INSERT INTO dproducto (nom_pro ,id_dep, id_uni) VALUES (?,?,?)",
                newProduct
            );

            res.redirect("/check-default-products");
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },

    async checkDefaultProducts(req, res, next) {
        try {
            let producto;
            producto = await pool.query(
                `SELECT * FROM dproducto WHERE id_tip = 1 `
            );

            res.render("admin-consultarProductosPredeterminados", {
                product: producto,
            });
        } catch (error) {
            console.error(error);
            res.redirect("/error");
        }
    },
    async stadistics(req, res) {
        let [listas, grupos, usuarios, sup, noti, marc] = await Promise.all([
            pool.query("SELECT COUNT(id_lis) AS rslt FROM mlista"),
            pool.query("SELECT COUNT(id_grp) AS rslt FROM mgrupo"),
            pool.query("SELECT COUNT(id_usu) AS rslt FROM musuario"),
            pool.query("SELECT COUNT(id_sup) AS rslt FROM csupermercado"),
            pool.query("SELECT COUNT(idDNoticias) AS rslt FROM dnoticias"),
            pool.query("SELECT COUNT(id_mar) AS rslt FROM cmarca"),
        ]);

        console.log(listas[0].rslt, grupos[0].rslt, usuarios[0].rslt);
        res.render("admin-index", {
            numListas: listas[0].rslt,
            numGrupos: grupos[0].rslt,
            numUsuarios: usuarios[0].rslt,
            numSup: sup[0].rslt,
            numNoti: noti[0].rslt,
            numMarc: marc[0].rslt,
        });
    },
    async delete(req, res) {
        //falta hacer un for que nos de todos los ids de los que tienen admin y un if(si arridpriv[i]==req.user.id_usu{})
        const { producto } = req.params;
        await pool.query("delete from dproducto where id_pro=?", [producto]);
        res.redirect("/check-default-products");
    },

    async editDefaultProduct(req, res) {
        let { nombrep } = req.body;
        let { departamento } = req.body;
        let { unidad } = req.body;
        let { id } = req.body;
        console.log(nombrep, departamento, unidad);

        let editProducto = [nombrep, departamento, unidad, id];

        await pool.query(
            "update dproducto set  nom_pro =? , id_dep=? , id_uni =? where id_pro = ?",
            [nombrep, parseInt(departamento), parseInt(unidad), parseInt(id)]
        );
        res.redirect("/check-default-products");
    },
};
