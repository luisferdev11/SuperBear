const estiloNoticias = '.contenedor-noticias{display: block;}.contenedor-twitter{display: none;}';
const estiloTwitter = '.contenedor-twitter{display: block;}.contenedor-noticias{display: none;}';
const selectorTwitter = document.getElementById("twitter");
const selectorNoticias = document.getElementById("noticias");
const etiquetaEstilo = document.getElementById("estilo");

selectorNoticias.addEventListener("change", cambiarEstilo);
selectorTwitter.addEventListener("change", cambiarEstilo);

function cambiarEstilo(){
    if(selectorNoticias.checked){
        etiquetaEstilo.innerHTML = estiloNoticias;
    }
    if(selectorTwitter.checked){
        etiquetaEstilo.innerHTML = estiloTwitter;
    }
}