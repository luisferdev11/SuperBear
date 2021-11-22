const express = require("express");
const router = express.Router();
const pool = require("../../database");
const controller = require("./controller");
const auth = require("../auth/auth");


router.get("/", (req, res) => {
    res.render("index");
});


router.get("/check-default-products", controller.checkDefaultProducts);

router.get("/create-default-object", (req, res) => {
    res.render("admin-crearProductoPredeterminado");
    //res.sendFile(path.join(dirname, '/views/iniciarSesion.html'));
});
router.get("/delete-default-product/:producto",controller.delete);
router.get("/edit-default-product/:id",async(req, res) => {
    let {id}=req.params;
    let producto = await pool.query("SELECT * FROM dproducto WHERE id_pro = ? ",[id]);
    res.render("admin-editarProductoPredeterminado",{product:producto, id:id});
    //res.sendFile(path.join(dirname, '/views/iniciarSesion.html'));
});


// AQUI VAN LOS POST

module.exports = router;

router.post("/create-default-object", controller.createDefaultObject);

router.post("/edit-default-product/:id", controller.editDefaultProduct);