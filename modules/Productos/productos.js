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
            res.redirect('/error');
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
            res.redirect('/error');
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
        var nomb = [];
        for (let i = 0; i < name.length; i++) {
            const miembro = name[i].nom_lis;
            nomb.push(miembro);
        }    
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
            const miembro = id_e[0];
            const productos = await pool.query(
                "select * from dproducto where id_eli = ?",
                [miembro]
                );       
            console.log("estos son los productos"+JSON.stringify(productos));  
            console.log("tamaño "+JSON.stringify(productos[0]));  
            var prod = [];
            
            for (let i = 0; i < productos.length; i++) {
                var mar = await pool.query(
                    "select Marca from CMarca where id_mar = ?",
                    [productos[i].id_mar]
                );
                var dep = await pool.query(
                    "select nom_dep from CDepartamento where id_dep = ?",
                    [productos[i].id_dep]
                );
                var uni = await pool.query(
                    "select unidad from CUnidad where id_uni = ?",
                    [productos[i].id_uni]
                );
                var sup = await pool.query(
                    "select nom_sup from CSupermercado where id_sup = ?",
                    [productos[i].id_sup]
                );

                var pro = {
                    id_pro: productos[i].id_pro,
                    nom_pro: productos[i].nom_pro,
                    can_pro: productos[i].can_pro,
                    precio_pro: productos[i].precio_pro,
                    notas_pro: productos[i].notas_pro,
                    id_tip: productos[i].id_tip,
                    id_mar: mar[0].Marca,
                    id_dep: dep[0].nom_dep,
                    id_uni: uni[0].unidad,
                    id_sup: sup[0].nom_sup,
                    id_esProd: productos[i].id_esProd,
                    id_eli: productos[i].id_eli
                };
                prod.push(pro);
                console.log(pro);
            }    

            console.log(JSON.stringify(productos));
            console.log(idl);
            console.log(grupo);
            console.log(nomb);
            
            res.render("consultarProductosDeLista", {
                productos: prod,
                idLista: idl,
                grupo: grupo,
                name: nomb
            });
            
        } catch (err) {
            res.redirect('/error');
            console.log(err);
        }
    },

    async redirectEditar(req, res){
        try{
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            let id_grupo = await pool.query('select id_lst from elista where id_eli =' + id_lis + ';');
            console.log(id_grupo);
            let producto = await pool.query('select * from dproducto where id_eli =' + id_lis + ' and id_pro=' + id_prod + ';');
            const Marca = await getAllMarca();
            const Depa = await getAllDepa();
            const Uni = await getAllUni();
            const Super = await getAllSuper();
            res.render('editarProductoDeLista', { id_lis, producto, Marca, Depa, Uni, Super, id_prod, id_grupo });
        }catch{
            res.redirect('/error');
        }
    },

    async editarProducto(req, res){
        try{
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
            let grupo = await pool.query('select id_lst from elista where id_eli =' + id_lis + ';');
            let enlace = '/ConsultarProductos/' + grupo[0].id_lst;
            await pool.query('update dproducto set can_pro=' + cantidad + ', nom_pro="' + nombre + '", precio_pro=' + precio + ', notas_pro="' + anotaciones + '", id_mar=' + marca + ', id_dep=' + depa + ', id_uni=' + unidad + ', id_sup=' + supermercado + ' where id_pro=' + id_prod + ' and id_eli=' + id_lis + ';');
            res.redirect(enlace);
        }catch{
            res.redirect('/error');
        }
    },

    async borrarProducto(req, res){
        try{
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            console.log(id_prod);
            console.log(id_lis);
            await pool.query('delete from dproducto where id_pro=' +  id_prod + ' and id_eli=' + id_lis + ';');
            let grupo = await pool.query('select id_lst from elista where id_eli =' + id_lis + ';');
            let enlace = '/ConsultarProductos/' + grupo[0].id_lst;
            res.redirect(enlace);
        }catch{
            res.redirect('/error');
        }
    },
    async Estado(req, res){
        try{
            let { id_prod } = req.params;
            let { id_lis } = req.params;
            console.log(id_prod);
            console.log(id_lis);
            const est = await pool.query(
                "select id_esProd from dproducto where id_pro = ?",
                [id_prod]
            );
            if (est[0].id_esProd == 1){
                await pool.query(
                    "update dproducto set id_esProd = 2  where id_pro = ?",
                    [id_prod]
                );
            }else{
                await pool.query(
                    "update dproducto set id_esProd = 1  where id_pro = ?",
                    [id_prod]
                );
            }
            
            let grupo = await pool.query('select id_lst from elista where id_eli =' + id_lis + ';');
            res.redirect("/ConsultarProductos/"+grupo[0].id_lst);
        }catch{
            res.redirect('/error');
        }
    }

};