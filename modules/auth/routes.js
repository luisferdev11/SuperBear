const express = require("express");
const router = express.Router();

const auth = require("./auth");

router.get("/verificarpswd", auth.isAuthenticated, auth.verificarpswd);

module.exports = router;
