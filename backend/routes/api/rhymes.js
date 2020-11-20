const express = require("express");
const datamuse = require("datamuse");
const router = express.Router();

router.post("/get-rhymes", function (req, res) {
    datamuse.request(`words?rel_rhy=${req.body.rhyme}`).then((rhymesJson) => {
        res.send(rhymesJson);
    });
});

module.exports = router;
