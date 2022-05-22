const pool = require("../../database");
const { env } = require("../../credenciales");

async function clonarLista(rutina){
    let nombre = await pool.query(
        "select nom_lis from mlista where id_lis = ?",
        rutina.id_lis
    );
    nombre = nombre[0].nom_lis;

    let nuevaLista = await pool.query(
        'INSERT INTO mlista (nom_lis, fec_lis, id_esList, tot_list) VALUES (?,CURDATE(),1,0.0)',
        nombre
    );
    nuevaLista = nuevaLista.insertId;
    let eliNuevaLista = await pool.query(
        "INSERT INTO ELista (id_grp, id_lst) VALUES (?, ?)",
        [rutina.id_grp, nuevaLista]
    );
    eliNuevaLista = eliNuevaLista.insertId;
    const productos = await pool.query(
        "select * from dproducto where id_eli = ?",
        rutina.id_eli
    );

    for (let i = 0; i < productos.length; i++) {
        let nombre = productos[i].nom_pro;
        let marca = productos[i].id_mar;
        let sup = productos[i].id_sup;
        let dep = productos[i].id_dep;
        let uni = productos[i].id_uni;
        let can = productos[i].can_pro;
        let precio = productos[i].precio_pro;
        let notas = productos[i].notas_pro;
        let tipo = productos[i].id_tip;

        await pool.query(
            "INSERT INTO dproducto (id_eli, nom_pro, id_mar, id_sup, id_dep, id_uni, can_pro, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [eliNuevaLista, nombre, marca, sup, dep, uni, can, precio, notas, tipo, 1]
        );
    }
}

async function updateRutina(id){
    await pool.query(
        "update drutinas set lst_updt = curdate() where id_rut = ?",
        id
    );
}

module.exports = {
    async crearLista(req, res) {
        try {
            const {nombre}  = req.body;
            const {grupo} = req.body;
            let nom = [nombre];
            await pool.query(
                "INSERT INTO mlista (nom_lis, fec_lis, id_esList, tot_list) VALUES (?,CURDATE(),1,0.0)",
                [nom]
            );
            const id_list = await pool.query(
                "select id_lis from mlista where id_lis = (select MAX(id_lis) from mlista)"
            );
            let union = [grupo, id_list[0].id_lis];
            await pool.query(
                "INSERT INTO ELista (id_grp, id_lst) VALUES (?)",
                [union]
            );
            const nomGrp = await pool.query(
                "SELECT nom_grp FROM MGrupo WHERE id_grp = ?",
                [grupo]
            );
            const id_lista = await pool.query(
                "SELECT id_lst FROM ELista WHERE id_grp = ?",
                [grupo]
            );
            var id_e = [];
            for (let i = 0; i < id_lista.length; i++) {
                const miembro = id_lista[i].id_lst;
                id_e.push(miembro);
            }
            var listas = [];
            for (let i = 0; i < id_e.length; i++) {
                const miembro = id_e[i];
                const list = await pool.query(
                    "SELECT * FROM MLista WHERE id_lis = ?",
                    [miembro]
                    );
                listas.push(list[0]);
            }


            res.redirect('/consultarlistas/' + grupo);
            
            
        } catch (err) {
            res.redirect('/error');
            console.log(err);
        }
    },async grupo(req, res) {
        const idg = req.params.id_grp;
        res.render("crearListaDeGrupo",{
            grupo: idg
        });
    }, async editarLista(req, res){
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
            res.redirect('/error');
            console.log(err);
        }
    },
    async borrarLista(req, res){


        const idl = req.params.id_lis;
        const grp = req.params.id_grp;
        try {
            let eli = await pool.query(
                "select id_eli from elista where id_lst = ?",
                idl
            );
            await pool.query(
                "delete from drutinas where id_lis = ?",
                idl
            )
            await pool.query(
                "delete from dproducto where id_eli = ?",
                eli[0].id_eli
            );
            await pool.query(
                "delete from elista where id_eli = ?",
                eli[0].id_eli
            );
            await pool.query(
                "DELETE from MLista where id_lis = ?",
                idl
            );
            
            
            res.redirect("/consultarlistas/"+grp);
        } catch (err) {
            res.redirect('/error');
            console.log(err);
        }
    }, 
    async ConsultarListas(req, res){
        try {
            let preview = new Array();
            const idgrupo = req.params.id_grp;

            // Rutinas del president

            let rutinas = await pool.query(
                "select * from drutinas where id_grp = ?",
                idgrupo
            );

            if(rutinas.length != 0){
                let ahora = new Date();
                // ahora.setHours(0, 0, 0, 0);
                ahora = ahora.getTime();
                for(var i = 0; i < rutinas.length; i++){
                    let lastUpdt = rutinas[i].lst_updt.getTime();
                    let intervalo = rutinas[i].prd * 24 * 60 * 60 * 1000;
                    if(ahora - intervalo > lastUpdt){
                        clonarLista(rutinas[i]);
                        updateRutina(rutinas[i].id_rut);
                    }
                }
            }
            
            // Fin rutinas president

            const nomGrp = await pool.query(
                "SELECT nom_grp FROM MGrupo WHERE id_grp = ?",
                [idgrupo]
            );
            const grupo = nomGrp[0].nom_grp;
            const id_lista = await pool.query(
                "SELECT id_lst FROM ELista WHERE id_grp = ?",
                [idgrupo]
            );
            var id_e = [];
            for (let i = 0; i < id_lista.length; i++) {
                const miembro = id_lista[i].id_lst;
                id_e.push(miembro);
            }
            var listas = [];
            for (let i = 0; i < id_e.length; i++) {
                const miembro = id_e[i];
                const list = await pool.query(
                    "SELECT * FROM MLista WHERE id_lis = ?",
                    [miembro]
                    );
                listas.push(list[0]);
            }
            for(let a = 0; a < listas.length; a++){
                let id = await pool.query('select id_eli from elista where id_lst=' + listas[a].id_lis + ';');
                id = id[0].id_eli;
                let prodLista = await pool.query('select * from dproducto where id_eli=' + id + ';');
                for(var i = 0; i < 2; i++){
                    if(prodLista[i] == undefined){
                        preview.push('estoesuntextolargocomoplaceholder');
                    }else{
                        preview.push(prodLista[i]);
                    }
                }
            };
            res.render("consultarListasDeGrupo", {
                listas: listas,
                idgrupo: idgrupo,
                nombre: grupo,
                preview
            });
            
        } catch (err) {
            res.redirect('/error');
            console.log(err);
        }
    },
    async DuplicarLista(req, res){
        try {
            const idg = req.params.id_grp;
            const idl = req.params.id_lis;
        
            const Clista = await pool.query(
                "select nom_lis from mlista where id_lis = ?",
                [idl]
            );
            const Edup = await pool.query(
                "select id_eli from elista where id_lst = ?",
                [idl]
            );
            
            const Nombre = Clista[0].nom_lis;
            let nuevaLista = await pool.query(
            'INSERT INTO mlista (nom_lis, fec_lis, id_esList, tot_list) VALUES (?,CURDATE(),1,0.0);',
                [Nombre]
            );
            let union = [idg, nuevaLista.insertId];
            let idNuevaLista = await pool.query(
                "INSERT INTO ELista (id_grp, id_lst) VALUES (?)",
                [union]
            );
            const Plista = await pool.query(
                "select * from DProducto where id_eli = ?",
                Edup[0].id_eli
            );
            
            for (let i = 0; i < Plista.length; i++) {
                let nombre = Plista[i].nom_pro;
                let marca = Plista[i].id_mar;
                let sup = Plista[i].id_sup;
                let dep = Plista[i].id_dep;
                let uni = Plista[i].id_uni;
                let can = Plista[i].can_pro;
                let precio = Plista[i].precio_pro;
                let notas = Plista[i].notas_pro;
                let tipo = Plista[i].id_tip;

                await pool.query(
                    "INSERT INTO dproducto (id_eli, nom_pro, id_mar, id_sup, id_dep, id_uni, can_pro, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    [idNuevaLista.insertId, nombre, marca, sup, dep, uni, can, precio, notas, tipo, 1]
                );
            }
            res.redirect("/consultarlistas/"+idg);
        } catch (err) {
            res.redirect('/error');
            console.log(err);
        }
    }
};
