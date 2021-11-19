/*
Supermercados

const dataset = ['WalMart', 'Soriana', 'Chedraui', 'La Comer', 'Costco', 'Casa Ley', 'HEB', 'Alsuper', 'Arteli', 'Aurrera', 'OXXO', 'Bodega Aurrera', 'S-Mart', 'Sam’s Club', 'Superama', 'Grupo Gigante', '7-Eleven', 'Tiendas EXTRA', 'Tiendas KIOSKO'];
const tabla = 'csupermercado ';
const columnas = '(id_sup, nom_sup)';
*/

/*
Marcas

const datos = "Alpura,Los Altos,Abuelita,Dulces Anahuac,Ariel,Barcel,Bimbo,Adams,Beny,Bolitochas,Bokados,Cacique,Calmex,Camaronazo,Canasta,Carlos V,Salsas Castillo,Cinsa,Chaparritas,Charras,Chata,Cheetos,Choco Milk,Cholula,Clemente Jacques,Comida Comal,Coronado,De la Rosa,Del Fuerte,Del Real,Dolores,D Gari,Don Gustavo,Doritos,Dolores,Dona Maria,Downy,Duvalin,El Pato,El Yucateco,Embasa,La Corona,Fabuloso,Fiesta,Foca,Sabritas,Fritos,Gamesa,Herdez,Saladitas,Ibarra,Isadora,Jarritos,Jumex,Juquilita,Dulces Karla,Kirkland,Klass,Knorr,Sazon,La Anita,La Costena,Rancho La California,Los Garcia,La Meridana,La Sierra,La India Verdena,La Lechera,Lala,La Moderna,La Perla del Mayab,La Morena,La Zagala,Las Sevillanas,La Victoria,Las Palmas,Cafe Legal,Lirio,Lol Tun,Dulces Lorena,Lucas,Maggi,Maizena,Mexicali,McCormick,Marinela,Maseca,Materva,Mayanik,MegaMex Foods,Michemix,Miguelito,Milo,Minsa,Dulces Montes,Novamex,Nescafe,NesQuik,Nestle,Nutresa,Ricolino,Rogelio Bueno,Roland Foods,Roma,Rosarita,Royal,Ruffles,San Miguel,San Marcos,Sanissimo,Sidral Mundet,Sonrics,Suavitel,T-Taio,Tadin,Tajin,Takis,Tama-Roca,Tapatio,Tostitos,Tres Estrellas,Tres Espadas,Vainilla Maya,Valentina,Vanart,Vero,Zaaschila,Zote,Zumba Pica,Zuko,Tepachito,Cielito,Otra Marca";

const dataset = datos.split(',');
*/

/*
Departamentos

//alter table cdepartamento modify nom_dep varchar(50) not null;

const dataset = ['Frutas y Verduras', 'Abarrotes', 'Lacteos', 'Carnes, Pescados y Mariscos', 'Salchichoneria', 'Panaderia y Tortilleria', 'Bebidas y Licores', 'Congelados', 'Limpieza para el Hogar', 'Detergente y Suavizante', 'Mascotas', 'Bebes', 'Farmacia', 'Higiene y Belleza', 'Electronica', 'Articulos para el Hogar y autos', 'Ropa y Zapateria', 'Jugueteria y Deportes'];
*/

// Unidades
const dataset = ['Unidad', 'Kilogramo', 'Litro'];
const columnas = '(id_uni, unidad)';
const tabla = 'cunidad ';
const insert = 'insert into ';
const values = ' values ';



function ejecutar(){
    console.log(insert + tabla + columnas + values + array() + ';');
}

function array(){
    let salida = '';
    for(let i = 1; i < dataset.length + 1; i++){
        salida += "(" + i + ", '" + dataset[i - 1] + "'), ";
    };
    return salida;
    // Es necesario quitarle la ultima coma pa que se ejecute la query
    //Ejemplo:
    // Antes -> insert into cunidad (id_uni, unidad) values (1, 'Unidad'), (2, 'Kilogramo'), (3, 'Litro'), ;
    // Despues -> insert into cunidad (id_uni, unidad) values (1, 'Unidad'), (2, 'Kilogramo'), (3, 'Litro');

}

ejecutar();

