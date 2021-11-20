let formulario = document.getElementById("LoginForm");
let formsignup = document.getElementById("registroForm");
let formgrupo1 = document.getElementById("NewGrupoForm");
let formingresargrupo = document.getElementById("ingresarGrupoForm");
let editarForm = document.getElementById("editarForm");
function validarEmail(email) {
    var regex = /^[-\w.%+]{1,34}@(?:[A-Z0-9-]{1,10}\.){1,10}[A-Z]{2,10}$/i;
    return regex.test(email) ? true : false;
}
function validarNombres(Nombre) {
    var regex = /^[A-Z]{1,32}$/i;
    return regex.test(Nombre) ? true : false;
}
function validarNombreLista(Nombre) {
    var regex = /^[A-Z]{1,20}$/i;
    return regex.test(Nombre) ? true : false;
}
function NombreObjeto(Nombre) {
    var regex = /^[A-Z0-9-]{1,64}$/i;
    return regex.test(Nombre) ? true : false;
}
function MarcaObjeto(Nombre) {
    var regex = /^[A-Z0-9-]{0,25}$/i;
    return regex.test(Nombre) ? true : false;
}
function SuperObjeto(Nombre) {
    var regex = /^[A-Z0-9-]{0,25}$/i;
    return regex.test(Nombre) ? true : false;
}
function CantidadObjeto(Cantidad) {
    var regex = /^[0-9]{0,5}$/i;
    return regex.test(Cantidad) ? true : false;
}
function PrecioObjeto(Precio) {
    var regex = /^[0-9]{0,6}$/i;
    return regex.test(Precio) ? true : false;
}
function AnotacionesObjeto(Anotaciones) {
    var regex = /^[A-Z0-9-]{0,64}$/i;
    return regex.test(Anotaciones) ? true : false;
}
function nombreGrupo(Nombre) {
    var regex = /^[A-Z]{1,20}$/i;
    return regex.test(Nombre) ? true : false;
}
function codigoGrupo(Codigo) {
    var regex = /^[A-Z0-9-]{5}$/i;
    return regex.test(Codigo) ? true : false;
}
function validarContraseñas(Contraseña) {
    var regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,64}$/;
    return regex.test(Contraseña) ? true : false;
}

function validarCodigoGrupo(event) {
    var nombre = codigoGrupo(document.getElementById("inputcodigo").value);
    if (nombre == true) {
        document.getElementById("msgerror1").innerHTML = "";
        formingresargrupo.setAttribute("action", "/ingresargrupo");
    } else {
        document.getElementById("msgerror1").innerHTML =
            "El codigo del grupo solo puede contener numeros y letras con longitud no mayor a 5, si no tienes codigo crea un grupo";

        event.preventDefault();
    }
}
function validarNombreGrupo(event) {
    var nombre = nombreGrupo(document.getElementById("inputgrupo").value);
    if (nombre == true) {
        document.getElementById("msgerror2").innerHTML = "";
        formgrupo1.setAttribute("action", "/nuevogrupo");
    } else {
        document.getElementById("msgerror2").innerHTML =
            "El nombre del grupo solo puede contener letras con longitud no mayor a 20";

        event.preventDefault();
    }
}
function ValidarObjetoLista(event) {
    var nombre = NombreObjeto(document.getElementById("inputNombre").value);
    var marca = MarcaObjeto(document.getElementById("inputmarca").value);
    var Super = SuperObjeto(document.getElementById("inputsuper").value);
    var Cantidad = CantidadObjeto(
        document.getElementById("inputcantidad").value
    );
    var Precio = PrecioObjeto(document.getElementById("inputprecio").value);
    var Anotaciones = AnotacionesObjeto(
        document.getElementById("inputanotaciones").value
    );
    if (nombre == true) {
        document.getElementById("msgerror1").innerHTML = "";
        if (marca == true) {
            document.getElementById("msgerror2").innerHTML = "";
            if (Super == true) {
                document.getElementById("msgerror3").innerHTML = "";
                if (Cantidad == true) {
                    document.getElementById("msgerror4").innerHTML = "";
                    if (Precio == true) {
                        document.getElementById("msgerror5").innerHTML = "";
                        if (Anotaciones == true) {
                            document.getElementById("msgerror6").innerHTML = "";
                            CrearProForm.setAttribute("action", "/CrearProducto");
                        } else {
                            document.getElementById("msgerror6").innerHTML =
                                "Las anotaciones solo pueden contener caracteres alfanumericos y no debe de ser mayor a 32 caracteres";
                            event.preventDefault();
                        }
                    } else {
                        document.getElementById("msgerror5").innerHTML =
                            "El precio solo puede contener numeros y no puede ser mayor de 6 cifras";
                        event.preventDefault();
                    }
                } else {
                    document.getElementById("msgerror4").innerHTML =
                        "La cantidad solo puede contener numeros y no puede ser mayor de 5 cifras";
                    event.preventDefault();
                }
            } else {
                document.getElementById("msgerror3").innerHTML =
                    "El supermercado solo pueden contener caracteres alfanumericos y no debe de ser mayor a 15 caracteres";
                event.preventDefault();
            }
        } else {
            document.getElementById("msgerror2").innerHTML =
                "La marca solo pueden contener caracteres alfanumericos y no debe de ser mayor a 10 caracteres";
            event.preventDefault();
        }
    } else {
        document.getElementById("msgerror1").innerHTML =
            "El nombre puede contener entre 1 y 45 caracteres alfanumericos";
        event.preventDefault();
    }
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

//Falta añadir una funcion de parte del backend para que valide que el correo no halla sido utilizado
function ValidarLogin(event) {
    var email = validarEmail(document.getElementById("inputemail").value);
    var contraseña = validarContraseñas(
        document.getElementById("inputContraseña").value
    );

    if (email == true) {
        document.getElementById("msgerror1").innerHTML = "";
        if (contraseña == true) {
            document.getElementById("msgerror2").innerHTML = "";
            formulario.setAttribute("action", "/login");
        } else {
            document.getElementById("msgerror2").innerHTML =
                "Las contraseñas deben coincidir y deben contener al menos una MAYUSCULA, un numero y un caracter especial  $ @ $ ! % * ? & y al menos 8 caracteres. Ejemplo: Ejemplo1$";
            event.preventDefault();
        }
    } else {
        document.getElementById("msgerror1").innerHTML =
            "El correo debe de tener el siguiente formato correo@correo.correo";

        event.preventDefault();
    }
}

function ValidarRegistro(event) {
    var email = validarEmail(document.getElementById("inputemail").value);
    var nombre = validarNombres(document.getElementById("inputNombre").value);
    var contraseña = validarContraseñas(
        document.getElementById("inputContraseña1").value
    );
    var confirmacion = validarContraseñas(
        document.getElementById("inputContraseña2").value
    );
    var edad = CalcularEdad(document.getElementById("inputdate").value);
    var isChecked = document.getElementById("aviso").checked;

    //colocar lo que va a hacer en caso de que las validaciones sean correctas o incorrectas

    if (email == true) {
        document.getElementById("msgerror1").innerHTML = "";

        if (nombre == true) {
            document.getElementById("msgerror2").innerHTML = "";

            if (
                contraseña == true &&
                confirmacion == true &&
                document.getElementById("inputContraseña1").value ==
                    document.getElementById("inputContraseña2").value
            ) {
                document.getElementById("msgerror3").innerHTML = "";

                if (edad >= 18) {
                    document.getElementById("msgerror4").innerHTML = "";

                    if (
                        document.registroForm.SelectAlcaldia.value != 0 &&
                        document.registroForm.SelectAlcaldia.value != "Alcaldía"
                    ) {
                        document.getElementById("msgerror5").innerHTML = "";

                        if (isChecked) {
                            document.getElementById("msgerror6").innerHTML = "";
                            formsignup.setAttribute("action", "/sign-up");

                            // Todo ha sido validado
                        } else {
                            document.getElementById("msgerror6").innerHTML =
                                "Para continuar debes leer y aceptar el aviso de privacidad";
                            event.preventDefault();
                        }
                    } else {
                        document.getElementById("msgerror5").innerHTML =
                            "Elige una alcaldia para continuar";
                        event.preventDefault();
                    }
                } else {
                    document.getElementById("msgerror4").innerHTML =
                        "Debes de ser mayor de edad para poder crear tu cuenta";

                    event.preventDefault();
                }
            } else {
                document.getElementById("msgerror3").innerHTML =
                    "Las contraseñas deben coincidir y deben contener al menos una MAYUSCULA, un numero y un caracter especial  $ @ $ ! % * ? & y al menos 8 caracteres. Ejemplo: Ejemplo1$";
                event.preventDefault();
            }
        } else {
            document.getElementById("msgerror2").innerHTML =
                "El nombre solo puede tener letras y un maximo de 32 caracteres";
            event.preventDefault();
        }
    } else {
        document.getElementById("msgerror1").innerHTML =
            "El correo debe de tener el siguiente formato correo@correo.correo";
        // document.getElementById('msgerror1').innerHTML='El correo debe de tener el siguiente formato correo@correo.correo');
        event.preventDefault();
    }
}
function ValidarLista(event) {

  var nombreLista = validarNombreLista(document.getElementById('inputNombre').value);
  if (nombreLista == true) {
    document.getElementById('msgerror1').innerHTML = "";
    formsignup.setAttribute("action", "/crearlista");


  } else {
    document.getElementById('msgerror1').innerHTML = "El nombre de la lista solo puede contener letras con longitud no mayor a 20";


        event.preventDefault();
    }
}
function ValidarEditar(event) {
    var nombre = validarNombres(document.getElementById("inputNombre").value);
    var contraseña = validarContraseñas(
        document.getElementById("inputContraseña1").value
    );
    var confirmacion = validarContraseñas(
        document.getElementById("inputContraseña2").value
    );
    var edad = CalcularEdad(document.getElementById("inputdate").value);

    //colocar lo que va a hacer en caso de que las validaciones sean correctas o incorrectas

    if (nombre == true) {
        document.getElementById("msgerror1").innerHTML = "";
        if (
            contraseña == true &&
            confirmacion == true &&
            document.getElementById("inputContraseña1").value ==
                document.getElementById("inputContraseña2").value
        ) {
            document.getElementById("msgerror2").innerHTML = "";
            if (edad >= 18) {
                document.getElementById("msgerror3").innerHTML = "";
                if (
                    document.editarForm.SelectAlcaldia.value == 0 ||
                    document.editarForm.SelectAlcaldia.value == "Alcaldía"
                ) {
                    document.getElementById("msgerror4").innerHTML =
                        "Elige una alcaldia para continuar";
                    if (
                        document.registroForm.SelectAlcaldia.value != 0 &&
                        document.registroForm.SelectAlcaldia.value != "Alcaldía"
                    ) {
                        document.getElementById("msgerror4").innerHTML = "";
                        editarForm.setAttribute("action", "/actualizardatos");
                    } else {
                        document.getElementById("msgerror4").innerHTML =
                            "Para continuar debes leer y aceptar el aviso de privacidad";
                        event.preventDefault();
                    }
                } else {
                    document.getElementById("msgerror5").innerHTML =
                        "Elige una alcaldia para continuar";
                    event.preventDefault();
                }
            } else {
                document.getElementById("msgerror3").innerHTML =
                    "Debes de ser mayor de edad para continuar";
                event.preventDefault();
            }
        } else {
            document.getElementById("msgerror2").innerHTML =
                "Las contraseñas deben coincidir y deben contener al menos una MAYUSCULA, un numero y un caracter especial  $ @ $ ! % * ? & y al menos 8 caracteres. Ejemplo: Ejemplo1$";
            event.preventDefault();
        }
    } else {
        document.getElementById("msgerror1").innerHTML =
            "El nombre solo puede tener letras y un maximo de 32 caracteres";
        event.preventDefault();
    }
}
