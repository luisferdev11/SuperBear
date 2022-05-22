const pool = require("../../database");

module.exports = {
    async consultarNombre(req, res){
        try{
                let idLista = req.params.lista;
                let nombre = await pool.query(
                    "select nom_lis from mlista where id_lis = ?",
                    idLista
                );
                res.render("crearRutinas", {
                    nombre: nombre[0].nom_lis,
                    idLista,
                    grupo : req.params.grupo
                });
            }catch(error){
                res.redirect("/error");
                console.log(error);
            }
        
    },

    async crearRutina(req, res){
        try{
            let { periodo } = req.body;
            periodo = parseInt(periodo);
            let { lista } = req.params;
            let { grupo } = req.params;
            let datos = await pool.query(
                "select id_eli, id_grp from elista where id_lst = ?",
                lista
            );
            await pool.query(
                "insert into drutinas (id_eli, id_lis, id_grp, prd, lst_updt) values(?,?,?,?, curdate())",
                [datos[0].id_eli, lista, datos[0].id_grp, periodo]
            );

            res.redirect("/consultarlistas/" + grupo);
        }catch(error){
            res.redirect("/error");
            console.log(error);
        }
        
    }
}