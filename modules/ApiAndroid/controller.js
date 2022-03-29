const express = require("express");
const pool = require("../../database");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/app/grupslist',async (req, res) => {
    var usuario=2;
    console.log(JSON.stringify(req.body.id));
    await pool.query(`SELECT m.id_grp, cod_grp, nom_grp, nom_usu,e.id_priv FROM mgrupo m
    INNER JOIN egrupo e
        ON m.id_grp = e.id_grp
    INNER JOIN musuario mu
        ON e.id_usu = mu.id_usu
        WHERE mu.id_usu = ?`
        , [usuario], (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        });

});
module.exports = router;
