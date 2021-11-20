const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true }));

//para poder trabajar con las cookies
app.use(cookieParser());

// app.get("/", function (req, res) {
//     res.render("index");
// });

app.get("/error", function (req, res) {
    res.render("error");
});
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function () {
    console.log(
        "Server",
        process.pid,
        "listening on port",
        app.get("port"),
        "or 5000"
    );
});
//estoy en VS code
app.use(
    "/",
    require("./modules/usuario/routes"),
    require("./modules/grupos/routes"),
    require("./modules/Listas/routes"),
    require("./modules/Productos/routes"),
    require("./modules/noticias/routes"),
    require("./modules/auth/routes")
);
