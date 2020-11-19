const express = require("express");
const router = express.Router();

router.get('/get-rhymes', function (req, res) {
    console.log("RHYMES#GET-RHYMES");
    res.send({rhymes: "Lorum Ipsum"});
});

module.exports = router;