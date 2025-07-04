var quizModel = require("../models/quizModel");

function gravarResultado(req, res) {
  var fkusuario = req.body.fkusuarioServer;
  var fkquiz = req.body.fkquizServer;
  var acertos = req.body.acertosServer;
  var pontuacao = req.body.pontuacaoServer;

  quizModel.gravarResultado(fkquiz, fkusuario, acertos, pontuacao).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao gravar os resultados: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function atualizarRanking(req, res) {

  quizModel.atualizarRanking().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao atualizar o ranking: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


module.exports = {
  gravarResultado,
  atualizarRanking
}