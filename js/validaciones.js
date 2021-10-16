function validarEmail(email) {
  var regex = /^[-\w.%+]{1,34}@(?:[A-Z0-9-]{1,10}\.){1,10}[A-Z]{2,10}$/i;
  return regex.test(email) ? true : false;
}
function validarNombres(Nombre) {
  var regex = /^[A-Z]{1,32}$/i;
  return regex.test(Nombre) ? true : false;
}
function validarContraseñas(Contraseña) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,64}$/;
  return regex.test(Contraseña) ? true : false;
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
  var nombre = validarNombres(document.getElementById("inputNombre").value);
  var contraseña = validarContraseñas(document.getElementById("inputContraseña1").value);
  var confirmacion = validarContraseñas(document.getElementById("inputContraseña2").value);

  //colocar lo que va a hacer en caso de que las validaciones sean correctas o incorrectas

  if (email == true) {
    alert("La dirección de email " + document.getElementById("inputemail").value + " es correcta.");
  } else {
    alert("La dirección de email " + document.getElementById("inputemail").value + " es incorrecta.");
  }
  if (nombre == true) {
    alert("El nombre " + document.getElementById("inputNombre").value + " es correcto.");
  } else {
    alert("El nombre " + document.getElementById("inputNombre").value + " es incorrecto.");
  }

  if (contraseña == true && confirmacion == true && document.getElementById("inputContraseña1").value==document.getElementById("inputContraseña2").value) {
    alert("Las contraseñas "  + " son correctas.");
  } else {
    alert("Las contraseñas "+ " son incorrectas.");
  }



}
