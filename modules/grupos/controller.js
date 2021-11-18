const pool = require("../../database");
const { env } = require("../../credenciales");
function generarCodigo() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let Cod = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        Cod += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
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
    

    

    async ingresargrupo(req, res) {
        //en id_usuario se debe de igualar al id que se pasara mediante las sesiones
        try {
            const id_usuario = req.user.id_usu;
            const { codigo } = req.body;
            const id_grupo = await pool.query(
                "SELECT id_grp FROM mgrupo WHERE cod_grp = ?",
                [codigo]
            );
            const grupo = id_grupo[0].id_grp;
            await pool.query(
                "INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)",
                [id_usuario, grupo, 2]
            );
            //"INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)"
            res.redirect("/misgrupos");
        } catch (error) {
            console.log(error);
            res.render("ingresar-crearGrupo", {
                error: "No se encontro el codigo de grupo",
            });
        }
    },

    async nuevogrupo(req, res) {
        
        do {
            const { nombreGrupo } = req.body;

            let codigo = generarCodigo();

            if ((await comprobarCodigo(codigo)) == true) {
                var confirmacion = true;
                let Arraycodigo = [nombreGrupo, codigo];
                try {
                    console.log(codigo);
                    await pool.query(
                        "INSERT INTO mgrupo (nom_grp ,cod_grp) VALUES (?,?)",
                        Arraycodigo
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
        } while (confirmacion == false);
        {
            console.log("Se asigno codigo de manera correcta");
        }
    },
    async miembrosdegrupo(req, res) {
        try {
            const grupo = 3;
            const id_miembros = await pool.query(
                "SELECT * FROM egrupo WHERE id_grp = ?",
                [grupo]
            );

            var arrmiembros = [];
            var arrprivilegios = [];
            for (let i = 0; i < id_miembros.length; i++) {
                const miembro = id_miembros[i].id_usu;
                var datosmiembro = await pool.query(
                    "SELECT id_usu FROM musuario WHERE id_usu = ?",
                    [miembro]
                );
                arrmiembros.push(datosmiembro[i].nom_usu);
                arrprivilegios.push(id_miembros[i].id_priv);
            }

            res.render("consultarMiembrosDeGrupo-miembroDeGrupo", {
                miembros: arrmiembros,
                privilegio: arrprivilegios,
            });
        } catch (error) {
            console.log(error);
            res.redirect("/error");
        }
    },
    async consultarmiembros(req, res) {
        try {
            const grupo = 3;
            const id_miembros = await pool.query(
                "SELECT * FROM egrupo WHERE id_grp = ?",
                [grupo]
            );
            var arrmiembros = [];
            var arrprivilegios = [];
            for (let i = 0; i < id_miembros.length; i++) {
                const miembro = id_miembros[i].id_usu;
                var datosmiembro = await pool.query(
                    "SELECT id_usu FROM musuario WHERE id_usu = ?",
                    [miembro]
                );
                arrmiembros.push(datosmiembro[i].nom_usu);
                arrprivilegios.push(id_miembros[i].id_priv);
            }
            const codigo_grupo = await pool.query(
                "SELECT cod_grp FROM mgrupo WHERE id_grp = ?",
                [grupo]
            );
            const code = codigo_grupo[0].cod_grp;

            res.render("consultarMiembrosyCodigoDeGrupo-administadorDeGrupo", {
                data: code,
                miembros: arrmiembros,
                privilegio: arrprivilegios,
            });
        } catch (error) {
            console.log("El id asignado no existe");
            res.redirect("/error");
        }
    },
};
