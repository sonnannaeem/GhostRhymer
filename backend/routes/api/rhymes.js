const express = require("express");
const datamuse = require("datamuse");
const router = express.Router();

router.post("/get-rhymes", function (req, res) {
  datamuse
    .words({
      rel_rhy: req.body.word,
    })
    .then((json) => {
      res.send(json);
    });
});

router.post("/get-syn", function (req, res) {
  datamuse
    .words({
      rel_syn: req.body.word,
    })
    .then((json) => {
      res.send(json);
    });
});

router.post("/get-related", function (req, res) {
  datamuse
    .words({
      ml: req.body.word,
    })
    .then((json) => {
      res.send(json);
    });
});

module.exports = router;
