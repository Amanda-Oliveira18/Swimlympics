var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/gravarResultado", function (req, res) {
  quizController.gravarResultado(req, res);
});

router.get("/atualizarRanking", function (req, res) {
  quizController.atualizarRanking(req, res);
});

module.exports = router;