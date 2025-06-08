var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/plotarGraficoPontuacao", function (req, res) {
  graficoController.plotarGraficoPontuacao(req, res);
});

router.get("/plotarGraficoAcertos", function (req, res) {
  graficoController.plotarGraficoAcertos(req, res);
});

router.get("/plotarGraficoIndividual/:fkusuario", function (req, res){
  graficoController.plotarGraficoIndividual(req, res);
});

module.exports = router;