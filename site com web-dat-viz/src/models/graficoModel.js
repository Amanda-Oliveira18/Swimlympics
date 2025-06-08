var database = require("../database/config");

function plotarGraficoPontuacao(){

  var instrucaoSql = 
  `select u.acompanha_natacao, round(sum(rc.pontuacao) / count(rc.fkquiz),2) 
          as media_da_pontuacao from resultados_quiz rc 
          join usuario u on u.idUsuario = rc.fkusuario 
          group by u.acompanha_natacao`;

  console.log("Executando a instrução DQL : \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function plotarGraficoAcertos(){

  var instrucaoSql = `select u.acompanha_natacao, round(avg(rc.acertos)) as media_acertos
                      from resultados_quiz rc join usuario u on u.idUsuario = rc.fkusuario
                      group by u.acompanha_natacao;`;

  console.log("Executando a instrução DQL : \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function plotarGraficoIndividual(fkusuario){

  var instrucaoSql = `select date_format(data_realizacao, '%d/%m %H:%i') as data_realização, sum(pontuacao) as pontuacao
                      from resultados_quiz
                      where fkusuario = ${fkusuario}
                      group by data_realizacao
                      order by data_realizacao;`;

  console.log("Executando a instrução DQL : \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  plotarGraficoPontuacao,
  plotarGraficoAcertos,
  plotarGraficoIndividual
}
