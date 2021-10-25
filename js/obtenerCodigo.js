const url = window.location.search;
const parametros = new URLSearchParams(url);
const codigo = parametros.get('codigo');
document.getElementById('codigo').value = codigo;