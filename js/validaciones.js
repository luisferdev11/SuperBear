function validarEmail(email) {
  var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return regex.test(email) ? true : false;
}



function CalcularEdad(fecha_nacimiento) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha_nacimiento);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}



function Validar(event) {
  var edad = CalcularEdad(document.getElementById("inputdate").value);
  if (edad >= 18) {
    alert("Eres mayor de edad");
  } else {
    alert("Eres menor de edad ");
  }
  var email = validarEmail(document.getElementById("inputemail").value);

  //colocar lo que va a hacer en caso de que las validaciones sean correctas o incorrectas

  if (email == true) {
    alert("La dirección de email " + document.getElementById("inputemail").value + " es correcta.");
  } else {
    alert("La dirección de email " + document.getElementById("inputemail").value + " es incorrecta.");
  }



}
