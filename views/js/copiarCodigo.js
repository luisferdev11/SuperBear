const display = '.toast{display: block;}';
const noDisplay = '.toast{display: none;}';
const estilo = document.getElementById('estilo');

function copiar(){
    const codigo = document.getElementById('codigo');
    codigo.focus();
    codigo.select();
    const texto = document.execCommand('copy');
    if (texto === 'unsuccessful') {
        console.error('Fallo al copiar el codigo. ');
    }
    estilo.innerHTML = display;
    setTimeout(() => {estilo.innerHTML = noDisplay;}, 5000);
};