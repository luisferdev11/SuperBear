const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("index");
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

app.get("/login", require("./Autenticate"));
app.post("/login", require("./Autenticate"));

app.get("/Misgrupos", (req, res) => {
    res.render("consultarGrupos");

});
