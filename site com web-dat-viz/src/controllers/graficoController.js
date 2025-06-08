var graficoModel = require("../models/graficoModel");

function plotarGraficoAcertos(req, res) {

  graficoModel.plotarGraficoAcertos().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao atualizar o gráfico de acertos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function plotarGraficoPontuacao(req, res) {

  graficoModel.plotarGraficoPontuacao().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao atualizar o gráfico de pontuação: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function plotarGraficoIndividual(req, res) {
  var fkusuario = req.params.fkusuario;

  graficoModel.plotarGraficoIndividual(fkusuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao atualizar o gráfico individual de desempenho: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  plotarGraficoPontuacao,
  plotarGraficoAcertos,
  plotarGraficoIndividual
}