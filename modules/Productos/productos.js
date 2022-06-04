const pool = require("../../database");
const axios = require("axios");

const { performance } = require("perf_hooks");

const obtenerPeliculas = async (text_input) => {
    try {
        const respuesta = await axios.post(
            "https://gepetto-iii.azurewebsites.net/product",
            {
                voice: text_input,
            }
        );

        return respuesta.data;
    } catch (error) {
        console.log(error);
    }
};

//     "3 kilos de arroz Sos de Walmart, si no hay no comprar nada"

async function doesAttributeExist(id, tabla, attribute, input) {
    try {
        if (input == null || input === "null" || input === "") {
            const myAtt_null = await pool.query(
                `SELECT ${id} FROM ${tabla} where ${id} = 1`
            );
            return myAtt_null;
        }
        const myAtt = await pool.query(
            `SELECT ${id} FROM ${tabla} where ${attribute} like'%${input}%'`
        );
        console.log(myAtt);

        if (myAtt.length > 0) {
            return myAtt;
        } else {
            await pool.query(`INSERT INTO ${tabla} (${attribute}) VALUES (?)`, [
                input,
            ]);
            const myAtt2 = await pool.query(
                `SELECT ${id} FROM ${tabla} where ${attribute} like'%${input}%'`
            );
            console.log(myAtt2);
            return myAtt2;
        }
    } catch (err) {
        console.log(err);
    }
}

async function putUnidad(id, tabla, attribute, input) {
    try {
        const myAtt = await pool.query(
            `SELECT ${id} FROM ${tabla} where ${attribute} like'%${input}%'`
        );
        console.log(myAtt);

        if (myAtt.length > 0) {
            return myAtt;
        } else {
            const myAtt_null = await pool.query(
                `SELECT ${id} FROM ${tabla} where ${id} = 5`
            );
            return myAtt_null;
        }
    } catch (err) {
        console.log(err);
    }
}

function validateTextToNumber(cantidad) {
    if (isNaN(cantidad)) {
        return 0;
    } else {
        return parseInt(cantidad);
    }
}

// propuesta para reducir codigo, por tiempos aun no esta implementada

// async function addProduct(params) {
//     try {
//         const id_lista = await pool.query(
//             "select id_eli from ELista where id_lst = ?",
//             [id_lis]
//         );
//         await pool.query(
//             "INSERT INTO DProducto (id_eli, nom_pro, id_mar, id_sup, id_dep, can_pro, id_uni, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,2,1)",
//             [
//                 id_lista[0].id_eli,
//                 nombre,
//                 parseInt(Marca),
//                 parseInt(supermercado),
//                 parseInt(Depa),
//                 parseInt(Cant),
//                 parseInt(Unidad),
//                 parseInt(Precio),
//                 Anotaciones,
//             ]
//         );
//         res.redirect("/ConsultarProductos/" + id_lis);
//     } catch (err) {
//         res.redirect("/error");
//         console.log(err);
//     }
// }

async function getAllMarca() {
    const marca = await pool.query(`SELECT * FROM cmarca`);
    return marca;
}

async function getAllDepa() {
    const depa = await pool.query(`SELECT * FROM CDepartamento`);
    return depa;
}
async function getAllUni() {
    const unidad = await pool.query(`SELECT * FROM CUnidad`);
    return unidad;
}

async function getAllSuper() {
    const Sup = await pool.query(`SELECT * FROM CSupermercado`);
    return Sup;
}

module.exports = {
    async CrearProductoVoice(req, res) {
        const producto = req.body.producto;

        //validar que la api funcione, pq sino se va todo a la cola
        const myProd = await obtenerPeliculas(producto);
        console.log(myProd);

        const { id_lis } = req.body;

        let nombre = "Producto misterioso";
        if (myProd.Nombre != null) {
            nombre = myProd.Nombre;
        }

        let [Marca, supermercado, Depa, Unidad] = await Promise.all([
            doesAttributeExist("id_mar", "cmarca", "Marca", myProd.Marca),
            doesAttributeExist(
                "id_sup",
                "csupermercado",
                "nom_sup",
                myProd.Supermercado
            ),
            doesAttributeExist(
                "id_dep",
                "cdepartamento",
                "nom_dep",
                myProd.Departamento
            ),
            putUnidad("id_uni", "cunidad", "unidad", myProd.Unidad),
        ]);

        const Cant = validateTextToNumber(myProd.Cantidad);
        console.log(Cant);
        const Precio = validateTextToNumber(myProd.Precio);
        console.log(Precio);
        const Anotaciones = myProd.Anotaciones;

        // ola

        try {
            const id_lista = await pool.query(
                "select id_eli from ELista where id_lst = ?",
                [id_lis]
            );
            await pool.query(
                "INSERT INTO DProducto (id_eli, nom_pro, id_mar, id_sup, id_dep, can_pro, id_uni, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,2,1)",
                [
                    id_lista[0].id_eli,
                    nombre,
                    parseInt(Marca[0].id_mar),
                    parseInt(supermercado[0].id_sup),
                    parseInt(Depa[0].id_dep),
                    parseInt(Cant),
                    parseInt(Unidad[0].id_uni),
                    parseInt(Precio),
                    Anotaciones,
                ]
            );
            res.redirect("/ConsultarProductos/" + id_lis);
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
    async CrearProducto(req, res) {
        const { nombre } = req.body;
        const { Marca } = req.body;
        const { supermercado } = req.body;
        const { Depa } = req.body;
        const { Cant } = req.body;
        const { Unidad } = req.body;
        const { Precio } = req.body;
        const { Anotaciones } = req.body;
        const { id_lis } = req.body;

        try {
            const id_lista = await pool.query(
                "select id_eli from ELista where id_lst = ?",
                [id_lis]
            );
            await pool.query(
                "INSERT INTO DProducto (id_eli, nom_pro, id_mar, id_sup, id_dep, can_pro, id_uni, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,2,1)",
                [
                    id_lista[0].id_eli,
                    nombre,
                    parseInt(Marca),
                    parseInt(supermercado),
                    parseInt(Depa),
                    parseInt(Cant),
                    parseInt(Unidad),
                    parseInt(Precio),
                    Anotaciones,
                ]
            );
            res.redirect("/ConsultarProductos/" + id_lis);
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
    async ConsultarCatalogo(req, res) {
        try {
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
                Super: Super,
            });
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
    async CrearPredeterminados(req, res) {
        try {
            const { id_prod } = req.params;
            const { id_lis } = req.params;
            const Prod = await pool.query(
                "select nom_pro, id_mar,  can_pro, id_uni from Dproducto where id_pro = ?",
                [id_prod]
            );
            const id_lista = await pool.query(
                "select id_eli from ELista where id_lst = ?",
                [id_lis]
            );
            await pool.query(
                "INSERT INTO DProducto (id_eli, nom_pro, id_mar,  can_pro, id_uni, id_tip, id_esProd) VALUES (?,?,?,?,?,2,1)",
                [
                    id_lista[0].id_eli,
                    Prod[0].nom_pro,
                    Prod[0].id_mar,
                    Prod[0].can_pro,
                    Prod[0].id_uni,
                ]
            );

            res.redirect("/ConsultarProductos/" + id_lis);
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
    async ConsultarPredeterminados(req, res) {
        try {
            const ideli = req.params;
            const Prod = await pool.query(
                "select * from Dproducto where id_tip = 1"
            );

            res.render("agregarProductoPredeterminadoALista", {
                id: ideli,
                Productos: Prod,
            });
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },
    async ConsultarProductos(req, res) {
        try {
            const idl = req.params.id_lis;
            const name = await pool.query(
                "select nom_lis from mlista where id_lis = ?",
                [idl]
            );
            const eli = await pool.query(
                "select * from elista where id_lst = ?",
                [idl]
            );

            var nomb = [];
            for (let i = 0; i < name.length; i++) {
                const miembro = name[i].nom_lis;
                nomb.push(miembro);
            }

            const grupo = eli[0].id_grp;
            var id_e = [];
            for (let i = 0; i < eli.length; i++) {
                const miembro = eli[i].id_eli;
                id_e.push(miembro);
            }
            const miembro = id_e[0];
            let productos = await pool.query(
                "select id_pro, nom_pro, can_pro ,precio_pro ,notas_pro,id_tip, cm.Marca, cd.nom_dep, cu.unidad, cs.nom_sup, id_esProd from dproducto dp INNER JOIN cmarca cm ON dp.id_mar = cm.id_mar INNER JOIN cdepartamento cd ON dp.id_dep = cd.id_dep INNER JOIN cunidad cu ON dp.id_uni = cu.id_uni INNER JOIN csupermercado cs ON dp.id_sup = cs.id_sup WHERE dp.id_eli =  ?",
                eli[0].id_eli
            );

            console.log(productos);

            var startTime = performance.now();
            // for (let i = 0; i < productos.length; i++) {
            //     let [mar, dep, uni, sup] = await Promise.all([
            //         pool.query("select Marca from CMarca where id_mar = ?", [
            //             productos[i].id_mar,
            //         ]),
            //         pool.query(
            //             "select nom_dep from CDepartamento where id_dep = ?",
            //             [productos[i].id_dep]
            //         ),
            //         pool.query("select unidad from CUnidad where id_uni = ?", [
            //             productos[i].id_uni,
            //         ]),
            //         pool.query(
            //             "select nom_sup from CSupermercado where id_sup = ?",
            //             [productos[i].id_sup]
            //         ),
            //     ]);
            //     // var mar = await pool.query(
            //     //     "select Marca from CMarca where id_mar = ?",
            //     //     [productos[i].id_mar]
            //     // );
            //     // var dep = await pool.query(
            //     //     "select nom_dep from CDepartamento where id_dep = ?",
            //     //     [productos[i].id_dep]
            //     // );
            //     // var uni = await pool.query(
            //     //     "select unidad from CUnidad where id_uni = ?",
            //     //     [productos[i].id_uni]
            //     // );
            //     // var sup = await pool.query(
            //     //     "select nom_sup from CSupermercado where id_sup = ?",
            //     //     [productos[i].id_sup]
            //     // );

            //     var pro = {
            //         id_pro: productos[i].id_pro,
            //         nom_pro: productos[i].nom_pro,
            //         can_pro: productos[i].can_pro,
            //         precio_pro: productos[i].precio_pro,
            //         notas_pro: productos[i].notas_pro,
            //         id_tip: productos[i].id_tip,
            //         id_mar: mar[0].Marca,
            //         id_dep: dep[0].nom_dep,
            //         id_uni: uni[0].unidad,
            //         id_sup: sup[0].nom_sup,
            //         id_esProd: productos[i].id_esProd,
            //         id_eli: productos[i].id_eli,
            //     };
            //     prod.push(pro);
            // }
            
            // ARREGLO PROVISIONAL A NUESTRO ERROR XD
            // El arreglo mejor es modificar la vista no el back
            let prod = [];
            for(let i = 0; i < productos.length; i++){
                let productoI = {
                    id_pro: productos[i].id_pro,
                    nom_pro: productos[i].nom_pro,
                    can_pro: productos[i].can_pro,
                    precio_pro: productos[i].precio_pro,
                    notas_pro: productos[i].notas_pro,
                    id_tip: productos[i].id_tip,
                    id_mar: productos[i].Marca,
                    id_dep: productos[i].nom_dep,
                    id_uni: productos[i].unidad,
                    id_sup: productos[i].nom_sup,
                    id_esProd: productos[i].id_esProd,
                    id_eli: productos[i].id_eli,
                }
                prod.push(productoI);
            }


            var endTime = performance.now();

            console.log(
                `Call to doSomething took ${endTime - startTime} milliseconds`
            );

            res.render("consultarProductosDeLista", {
                productos: prod,
                idLista: idl,
                grupo: grupo,
                name: nomb,
            });
        } catch (err) {
            res.redirect("/error");
            console.log(err);
        }
    },

    async redirectEditar(req, res) {
        try {
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            let id_grupo = await pool.query(
                "select id_lst from elista where id_eli =" + id_lis + ";"
            );
            let producto = await pool.query(
                "select * from dproducto where id_eli =" +
                    id_lis +
                    " and id_pro=" +
                    id_prod +
                    ";"
            );
            const Marca = await getAllMarca();
            const Depa = await getAllDepa();
            const Uni = await getAllUni();
            const Super = await getAllSuper();
            res.render("editarProductoDeLista", {
                id_lis,
                producto,
                Marca,
                Depa,
                Uni,
                Super,
                id_prod,
                id_grupo,
            });
        } catch (e) {
            res.redirect("/error");
            console.log(e);
        }
    },

    async editarProducto(req, res) {
        try {
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            let { nombre } = req.body;
            let { marca } = req.body;
            let { supermercado } = req.body;
            let { depa } = req.body;
            let { cantidad } = req.body;
            let { unidad } = req.body;
            let { precio } = req.body;
            let { anotaciones } = req.body;
            let grupo = await pool.query(
                "select id_lst from elista where id_eli =" + id_lis + ";"
            );
            let enlace = "/ConsultarProductos/" + grupo[0].id_lst;
            await pool.query(
                "update dproducto set can_pro=" +
                    cantidad +
                    ', nom_pro="' +
                    nombre +
                    '", precio_pro=' +
                    precio +
                    ', notas_pro="' +
                    anotaciones +
                    '", id_mar=' +
                    marca +
                    ", id_dep=" +
                    depa +
                    ", id_uni=" +
                    unidad +
                    ", id_sup=" +
                    supermercado +
                    " where id_pro=" +
                    id_prod +
                    " and id_eli=" +
                    id_lis +
                    ";"
            );
            res.redirect(enlace);
        } catch (e) {
            res.redirect("/error");
            console.log(e);
        }
    },

    async borrarProducto(req, res) {
        try {
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            await pool.query(
                "delete from dproducto where id_pro=" +
                    id_prod +
                    " and id_eli=" +
                    id_lis +
                    ";"
            );
            let grupo = await pool.query(
                "select id_lst from elista where id_eli =" + id_lis + ";"
            );
            let enlace = "/ConsultarProductos/" + grupo[0].id_lst;
            res.redirect(enlace);
        } catch (e) {
            res.redirect("/error");
            console.log(e);
        }
    },
    async Estado(req, res) {
        try {
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            const est = await pool.query(
                "select id_esProd from dproducto where id_pro = ?",
                [id_prod]
            );
            if (est[0].id_esProd == 1) {
                await pool.query(
                    "update dproducto set id_esProd = 2  where id_pro = ?",
                    [id_prod]
                );
            } else {
                await pool.query(
                    "update dproducto set id_esProd = 1  where id_pro = ?",
                    [id_prod]
                );
            }

            let grupo = await pool.query(
                "select id_lst from elista where id_eli =" + id_lis + ";"
            );
            res.redirect("/ConsultarProductos/" + grupo[0].id_lst);
        } catch (e) {
            res.redirect("/error");
            console.log(e);
        }
    },
};
