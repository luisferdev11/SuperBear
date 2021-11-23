const express = require("express");
const router = express.Router();
const pool = require("../../database");
const controller = require("./controller");
const auth = require("../auth/auth");

router.get("/admin-index", auth.isAuthenticated, auth.isAdmin, (req, res) => {
    res.render("admin-index");
});

router.get("/check-default-products", auth.isAuthenticated, auth.isAdmin, controller.checkDefaultProducts
);

router.get("/create-default-object", auth.isAuthenticated, auth.isAdmin,  (req, res) => {
    res.render("admin-crearProductoPredeterminado");
    //res.sendFile(path.join(dirname, '/views/iniciarSesion.html'));
});
router.get(
    "/delete-default-product/:producto",
    auth.isAuthenticated,
    auth.isAdmin, 
    controller.delete
);
router.get(
    "/edit-default-product/:id",
    auth.isAuthenticated,
    auth.isAdmin, 
    async (req, res) => {
        let { id } = req.params;
        let producto = await pool.query(
            "SELECT * FROM dproducto WHERE id_pro = ? ",
            [id]
        );
        res.render("admin-editarProductoPredeterminado", {
            product: producto,
            id: id,
        });
        //res.sendFile(path.join(dirname, '/views/iniciarSesion.html'));
    }
);

// AQUI VAN LOS POST

module.exports = router;

router.post(
    "/create-default-object",
    auth.isAuthenticated,
    auth.isAdmin, 
    controller.createDefaultObject
);

router.post(
    "/edit-default-product/:id",
    auth.isAuthenticated,
    auth.isAdmin, 
    controller.editDefaultProduct
);
