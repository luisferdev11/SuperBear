const { render } = require("ejs");
const pool = require("../../database");

function generarCodigo() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let Cod = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        Cod += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return Cod;
}
async function comprobarCodigo(codigo) {
    let respuesta;
    let consultacod = await pool.query(
        "SELECT cod_grp FROM mgrupo WHERE cod_grp=?",
        [codigo]
    );
    if (consultacod.length == 0) {
        respuesta = true;
    } else {
        respuesta = false;
    }
    return respuesta;
}

module.exports = {
    async deletegroup(req, res) {
        //falta hacer un for que nos de todos los ids de los que tienen admin y un if(si arridpriv[i]==req.user.id_usu{})
        try {
            const { grupo } = req.params;
            const idusu = req.user.id_usu;
            let permisos = [grupo, idusu];
            const id_miembros = await pool.query(
                "SELECT * FROM egrupo WHERE (id_grp = ?) AND (id_usu=?)",
                permisos
            );
            if (id_miembros[0].id_priv == 1) {
                await pool.query("delete from egrupo where id_grp=?", [grupo]);
                await pool.query(
                    "UPDATE `superbear`.`mgrupo` SET `cod_grp` = 'bears' WHERE (`id_grp` = ?)",
                    [grupo]
                );
                res.redirect("/misgrupos");
            } else {
                res.redirect("/misgrupos");
            }
        } catch (error) {
            res.redirect("/error");
        }
    },
    async ingresargrupo(req, res) {
        //en id_usuario se debe de igualar al id que se pasara mediante las sesiones
        function codigoGrupo(Codigo) {
            var regex = /^[A-Z0-9-]{5}$/i;
            return regex.test(Codigo) ? true : false;
        }
        try {
            const id_usuario = req.user.id_usu;
            const { codigo } = req.body;
            if (codigoGrupo(codigo) == true) {
                const id_grupo = await pool.query(
                    "SELECT * FROM mgrupo WHERE cod_grp = ?",
                    [codigo]
                );
                const grupo = id_grupo[0].id_grp;

                try {
                    const misgrupos = await pool.query(
                        "SELECT * FROM egrupo WHERE (id_usu = ?) AND (id_grp=?)",
                        [id_usuario, grupo]
                    );
                    if (misgrupos[0].id_grp) {
                        res.render("ingresar-crearGrupo", {
                            error: "Ya se ingreso a ese grupo",
                        });
                    } else {
                        res.redirect("/error");
                    }

                } catch (error) {
                    await pool.query(
                        "INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)",
                        [id_usuario, grupo, 2]
                    );
                    res.redirect("/misgrupos");
                }
            } else {
                res.redirect("/error");
                console.log(
                    "Activa el JavaScrit no ingrese caracteres que no sean letras"
                );
            }
        } catch (error) {
            res.render("ingresar-crearGrupo", {
                error: "No se encontro el codigo de grupo",
            });
        }
    },
    async delete(req, res) {
        //falta hacer un for que nos de todos los ids de los que tienen admin y un if(si arridpriv[i]==req.user.id_usu{})
        const { grupo } = req.params;
        const { id } = req.params;
        const idusu = req.user.id_usu;
        let permisos = [grupo, idusu];
        const id_miembros = await pool.query(
            "SELECT * FROM egrupo WHERE (id_grp = ?) AND (id_usu=?)",
            permisos
        );
        if (id_miembros[0].id_priv == 1 && id != req.user.id_usu) {
            let Deletegrupo = [id, grupo];
            let id_egrupo = await pool.query(
                "select id_egp from egrupo where (id_usu=?) AND (id_grp=?)",
                Deletegrupo
            );
            await pool.query("delete from egrupo where id_egp=?", [
                id_egrupo[0].id_egp,
            ]);
            res.redirect(`/consultarmiembros/${grupo}`);
        } else {
            res.redirect("/error");
        }
    },
    async abandonargrupo(req, res) {
        const { grupo } = req.params;
        const { id } = req.params;

        if (id == req.user.id_usu) {
            let Deletegrupo = [id, grupo];
            let id_egrupo = await pool.query(
                "select id_egp from egrupo where (id_usu=?) AND (id_grp=?)",
                Deletegrupo
            );
            await pool.query("delete from egrupo where id_egp=?", [
                id_egrupo[0].id_egp,
            ]);
            res.redirect("/misgrupos");
        } else {
            res.redirect("/error");
        }
    },
    async nuevogrupo(req, res) {
        function validarNgrupo(Nombre) {
            var regex = /^[A-Z]{1,20}$/i;
            return regex.test(Nombre) ? true : false;
        }
        do {
            const { nombreGrupo } = req.body;
            if (validarNgrupo(nombreGrupo) == true) {
                var codigo = generarCodigo();

                if ((await comprobarCodigo(codigo)) == true) {
                    var confirmacion = true;
                    let Arraycodigo = [nombreGrupo, codigo];
                    try {
                        await pool.query(
                            "INSERT INTO mgrupo (nom_grp ,cod_grp) VALUES (?,?)",
                            Arraycodigo
                        );

                        const id_usuario = req.user.id_usu;

                        const id_grupo = await pool.query(
                            "SELECT id_grp FROM mgrupo WHERE cod_grp = ?",
                            [codigo]
                        );
                        const grupo = id_grupo[0].id_grp;
                        await pool.query(
                            "INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)",
                            [id_usuario, grupo, 1]
                        );
                        res.redirect("/misgrupos");
                    } catch (err) {
                        console.log(err);
                        res.redirect("/error");
                    }
                    confirmacion == true;
                } else {
                    res.redirect("/error");
                    console.log(
                        "ya existe ese codigo o no se genero el codigo de manera correcta"
                    );
                }
            } else {
                res.redirect("/error");
                console.log(
                    "Activa el JavaScrit no ingrese caracteres que no sean letras"
                );
            }
        } while (confirmacion == false);
        {
            console.log("Se asigno codigo de manera correcta");
        }
    },
    async miembrosdegrupo(req, res) {
        try {
            const { grupo } = req.params;
            const id_miembros = await pool.query(
                "SELECT * FROM egrupo WHERE id_grp = ?",
                [grupo]
            );
            var arrid = [];
            var arrmiembros = [];
            var arrprivilegios = [];
            for (let i = 0; i < id_miembros.length; i++) {
                const miembro = id_miembros[i].id_usu;
                var datosmiembro = await pool.query(
                    "SELECT nom_usu FROM musuario WHERE id_usu = ?",
                    [miembro]
                );

                arrmiembros.push(datosmiembro[0].nom_usu);
                arrprivilegios.push(id_miembros[i].id_priv);
            }

            res.render("consultarMiembrosDeGrupo-miembroDeGrupo", {
                id_usuario: req.user.id_usu,
                grupo: grupo,
                miembros: arrmiembros,
                privilegio: arrprivilegios,
                id: arrid,
            });
        } catch (error) {
            console.log(error);
            res.redirect("/error");
        }
    },
    async consultarmiembros(req, res) {
        try {
            const { grupo } = req.params;
            const id_miembros = await pool.query(
                "SELECT * FROM egrupo WHERE id_grp = ?",
                [grupo]
            );
            if (id_miembros) {
                var arrid = [];
                var arrmiembros = [];
                var arrprivilegios = [];
                for (let i = 0; i < id_miembros.length; i++) {
                    const miembro = id_miembros[i].id_usu;
                    var datosmiembro = await pool.query(
                        "SELECT nom_usu FROM musuario WHERE id_usu = ?",
                        [miembro]
                    );
                    arrid.push(miembro);
                    arrmiembros.push(datosmiembro[0].nom_usu);
                    arrprivilegios.push(id_miembros[i].id_priv);
                }
            }
            const codigo_grupo = await pool.query(
                "SELECT cod_grp FROM mgrupo WHERE id_grp = ?",
                [grupo]
            );
            const code = codigo_grupo[0].cod_grp;
            let host = req.get("host");
            res.render("consultarMiembrosyCodigoDeGrupo-administadorDeGrupo", {
                grup: grupo,
                data: code,
                miembros: arrmiembros,
                privilegio: arrprivilegios,
                id: arrid,
                host,
            });
        } catch (error) {
            console.log(error);
            console.log("El id asignado no existe");
            res.redirect("/error");
        }
    },
    async misgrupos(req, res, next) {
        try {
            pool.query(
                `SELECT m.id_grp, cod_grp, nom_grp, nom_usu,e.id_priv FROM mgrupo m
            INNER JOIN egrupo e
                ON m.id_grp = e.id_grp
            INNER JOIN musuario mu
                ON e.id_usu = mu.id_usu
                WHERE mu.id_usu = ?`,
                [req.user.id_usu],
                async (error, results) => {
                    if (!results || results.length === 0) {
                        res.render("consultarGrupos", { user: req.user, nmiembros: [] });
                    }
                    var arrnummiembros = [];
                    req.user.grps = results;

                    // Checar si hay productos pendientes - president
                    // UwU
                    // Pusheo los resultados en otro array para que sea mas facil hacer las consultas
                    let idGrupos = new Array();
                    let idListas = new Array();
                    let pendientes = false;
                    // console.log(results);
                    for(var i = 0; i < results.length; i++){
                        idGrupos.push(results[i].id_grp);
                    }
                    let elistas = await pool.query(
                        'select id_eli from elista where id_grp in (' + idGrupos + ');'
                    );
                    // console.log(elistas);
                    for(let i = 0; i < elistas.length; i++){
                        idListas.push(elistas[i].id_eli)
                    }
                    let estadosProductos = await pool.query(
                        'select id_esProd from dproducto where id_eli in (' + idListas + ');'
                    );
                    // console.log(estadosProductos);
                    for(let i = 0; i < estadosProductos.length; i++){
                        if(estadosProductos[i].id_esProd == 1){
                            pendientes = true;
                        }
                    }
                    // console.log(pendientes);
                    // Final checar si hay pendientes - president

                    for (let i = 0; i < req.user.grps.length; i++) {
                        const id_miembros = await pool.query(
                            "SELECT * FROM egrupo WHERE id_grp = ?",
                            [req.user.grps[i].id_grp]
                        );
                        arrnummiembros.push(id_miembros.length);
                    }


                    res.render("consultarGrupos", { user: req.user, nmiembros: arrnummiembros, pendientes });
                }
            );
        } catch (error) {
            console.error(error);
            res.render("consultarGrupos", { user: req.user, nmiembros: [] });
        }
    },
};
