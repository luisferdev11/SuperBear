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
        
    },

    async consultarRutinas(req, res){
        try {
            let { grupo } = req.params;
            let rutinas = await pool.query(
                "select * from drutinas where id_grp = ?",
                grupo
            );
            for(var i = 0; i < rutinas.length; i++){
                let nombre = await pool.query(
                    "select nom_lis from mlista where id_lis = ?",
                    rutinas[i].id_lis
                );
                rutinas[i].nombre = nombre[0].nom_lis;
            }
            res.render("consultarRutinas",
            {
                grupo,
                rutinas
            });    
        } catch (error) {
            res.redirect("/error");
            console.log(error);
        }
        
    },

    async borrarRutina(req, res){
        try {
            let { rutina } = req.params;
            let { grupo } = req.params;
            await pool.query(
                "delete from drutinas where id_rut = ?",
                rutina
            );
            res.redirect("/consultarRutinas/" + grupo);    
        } catch (error) {
            res.redirect("/error");
            console.log(error);
        }
        
    },

    async getEditarRutina(req, res){
        try {
            let { rutina } = req.params;
            let { grupo } = req.params;
            let info = await pool.query(
                "select * from drutinas where id_rut = ?",
                rutina
            );
            let nombre = await pool.query(
                "select nom_lis from mlista where id_lis = ?",
                info[0].id_lis
            );
            res.render("editarRutinas",
            {
                grupo,
                info: info[0],
                nombre: nombre[0].nom_lis
            });   
        } catch (error) {
            res.redirect("/error");
            console.log(error);
        }
    },

    async editarRutina(req, res){
        try {
            let { rutina } = req.params;
            let { grupo } = req.params;
            let { periodo } = req.body;
            await pool.query(
                "update drutinas set prd = ? where id_rut = ?",
                [periodo, rutina]
            );
            res.redirect("/consultarRutinas/" + grupo);   
        } catch (error) {
            res.redirect("/error");
            console.log(error);
        }
    }
}