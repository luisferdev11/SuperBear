const express = require("express");

//const session = require('express-session');

const pool = require("../../database");
const app = express();
var router = express.Router();
router.get("/Misgrupos", (req, res) => {
    res.render("consultarGrupos");
});
module.exports = router;