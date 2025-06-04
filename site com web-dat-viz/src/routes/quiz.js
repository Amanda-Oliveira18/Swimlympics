var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/gravarResultado", function (req, res) {
  quizController.gravarResultado(req, res);
});

router.get("/atualizarRanking", function (req, res) {
  quizController.atualizarRanking(req, res);
});

router.get("/plotarGraficoPontuacao", function (req, res) {
  quizController.plotarGraficoPontuacao(req, res);
});

router.get("/plotarGraficoAcertos", function (req, res) {
  quizController.plotarGraficoAcertos(req, res);
});

module.exports = router;