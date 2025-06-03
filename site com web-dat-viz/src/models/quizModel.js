var database = require("../database/config");

function gravarResultado(fkquiz, fkusuario, acertos) {

  var instrucaoSql = `insert into resultados_quiz(fkusuario, fkquiz, acertos) values (${fkusuario}, ${fkquiz}, ${acertos})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarRanking(){

  var instrucaoSql = 
  `select u.perfil_usuario as usuario, u.acompanha_natacao, 
          count(q.idQuiz) as quizzesRespondidos, 
          sum(rc.acertos * 10) as pontuacaoTotal 
  from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz
              join resultados_quiz rc on rc.fkquiz = q.idQuiz
              join usuario u on u.idUsuario = rc.fkusuario
              group by u.perfil_usuario, u.acompanha_natacao
              order by pontuacaoTotal desc`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  gravarResultado,
  atualizarRanking
}
