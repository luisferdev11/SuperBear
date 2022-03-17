var nav = document.getElementsByTagName("nav")[0];
var prevScrollpos = window.pageYOffset;

// Te quiero mucho w3 schools
window.onscroll = function() {
    nav.style.position = "fixed";
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        nav.style.bottom = "0";
    } else {
        nav.style.bottom = "-50px";
    }
    prevScrollpos = currentScrollPos;
}
