const pool = require("../../database");

async function getAllMarca() {
    const marca = await pool.query(
        `SELECT * FROM cmarca`
    );
    return marca;
}

async function getAllDepa() {
    const depa = await pool.query(
        `SELECT * FROM CDepartamento`
    );
    return depa;
}
async function getAllUni() {
    const unidad = await pool.query(
        `SELECT * FROM CUnidad`
    );
    return unidad;
}

async function getAllSuper() {
    const Sup = await pool.query(
        `SELECT * FROM CSupermercado`
    );
    return Sup;
}

module.exports = {
    async CrearProducto(req, res) {       
        const { nombre } = req.body;
        console.log(nombre);
        const { Marca } = req.body;
        console.log(Marca);
        const { supermercado } = req.body;
        console.log(supermercado);
        const { Depa } = req.body;
        console.log(Depa);
        const { Cant } = req.body;
        console.log(Cant);
        const {Unidad} = req.body;
        console.log(Unidad);
        const {Precio} = req.body;
        console.log(Precio);
        const {Anotaciones} = req.body;
        console.log(Anotaciones);
        const {id_lis} = req.body;
        console.log(id_lis);
        
        try {
            const id_lista = await pool.query(
                "select id_eli from ELista where id_lst = ?",
                [id_lis]
            );
            console.log(id_lista);
            await pool.query(
                "INSERT INTO DProducto (id_eli, nom_pro, id_mar, id_sup, id_dep, can_pro, id_uni, precio_pro, notas_pro, id_tip, id_esProd) VALUES (?,?,?,?,?,?,?,?,?,2,1)",
                [id_lista[0].id_eli, nombre,parseInt(Marca), parseInt(supermercado), parseInt(Depa), parseInt(Cant), parseInt(Unidad), parseInt(Precio), Anotaciones]
            );
            res.redirect("/ConsultarProductos/"+id_lis);
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },async ConsultarCatalogo (req, res){
        try {
        const ideli = req.params;
        const Marca = await getAllMarca();
        const Depa = await getAllDepa();
        const Uni = await getAllUni();
        const Super = await getAllSuper();
        console.log(ideli);
        console.log(Marca);
        console.log(Depa);
        console.log(Uni);
        console.log(Super);
        res.render("agregarProductoALista", { 
            id: ideli,
            Marca: Marca,
            Depa: Depa,
            Uni: Uni,
            Super: Super
        });
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    },
    async ConsultarProductos (req, res){
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
        const grupo = eli[0].id_grp;
        var id_e = [];
            for (let i = 0; i < eli.length; i++) {
                const miembro = eli[i].id_eli;
                id_e.push(miembro);
            }            
            var productos = [];
            for (let i = 0; i < id_e.length; i++) {
                const miembro = id_e[i];
                const list = await pool.query(
                    "select * from dproducto where id_eli = ?",
                    [miembro]
                    );
                productos.push(list[0]);
            }

            console.log(JSON.stringify(productos));
            console.log(idl);
            console.log(grupo);
            console.log(name);

            res.render("consultarProductosDeLista", {
                productos: productos,
                idLista: idl,
                grupo: grupo,
                name: name
            });
            
        } catch (err) {
            res.render("error");
            console.log(err);
        }
    }
};