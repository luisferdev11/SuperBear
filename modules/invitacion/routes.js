const express = require("express");
const router = express.Router();


router.get('/invitacion', (req, res) =>{ 
    res.render('invitacion');
});

module.exports = router;