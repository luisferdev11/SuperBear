var nav = document.getElementsByTagName("nav")[0];
var prevScrollpos = window.pageYOffset;


// Si es un movil, cambia la barra de navegacion
if(SmartPhone.isAny()){

    nav.style.position = "fixed";
    nav.style.bottom = "0";
    // Te quiero mucho w3 schools
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            nav.style.bottom = "0";
        } else {
            nav.style.bottom = "-50px";
        }
        prevScrollpos = currentScrollPos;
    }
    
}


