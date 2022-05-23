const lang = "es-MX";
let lib = new p5.SpeechRec(lang);

// let output = select("#inputProducto");

const boton = document.getElementById("microphone");
boton.addEventListener("click", function () {
    lib.onResult = showResult; // bind callback function to trigger when speech is recognized
    lib.start(); // start listening

    function showResult() {
        console.log(lib.resultString); // log the result
        document.getElementById("inputProducto").value = lib.resultString;
    }
});
