// Inicializar el array de salida
let array = new Array();
// Obtiene todas las etiquetas span del documento
let spans = document.getElementsByTagName("span");
// Obtiene el contenido de todos los spans
// y lo guarda en el array de salida
for(let i = 0; i < spans.length; i++){
    array[i] = spans[i].textContent;
}

// Muestra en consola los resultados
console.log(array);


// Puedes copiar esta funcion en la consola de una pagina web y llamarla
function scraping(){
    let array = new Array();
    //Puedes cambiar esta linea para que funcione por clase, id u otra cosa
    let etiquetas = document.getElementsByTagName("span");
    for(let i = 0; i < etiquetas.length; i++){
        array[i] = etiquetas[i].textContent;
    }
    console.log(array);
}

// Para que se pueda copiar y pegar escribe el contenido del array
// de salida en un div o p con id "salida"
document.getElementById("salida").innerHTML = array;