create database swimlympics;

use swimlympics;

create table usuario (
idUsuario int primary key not null auto_increment,
nome varchar(100) not null,
perfil_usuario varchar(50) unique not null,
email varchar(255) not null,
senha varchar(255) not null,
acompanha_natacao char(3) not null
);

create table nivel_quiz(
idNivel_quiz int primary key not null auto_increment,
nivel_dificuldade varchar(20) not null unique
);

create table quiz(
idQuiz int primary key not null auto_increment,
nivel_quiz int not null,
foreign key (nivel_quiz) references nivel_quiz(idNivel_quiz)
);

create table resultados_quiz (
idResultado int not null auto_increment,
fkusuario int not null,
fkquiz int not null,
total_perguntas int not null default 5,
acertos int not null,
pontuacao int not null,
data_realizacao datetime default current_timestamp,
primary key(idResultado, fkusuario, fkquiz),
foreign key (fkusuario) references usuario(idUsuario),
foreign key (fkquiz) references quiz(idQuiz)
);

select * from resultados_quiz;

-- inserindo os niveis de quiz
insert into nivel_quiz(nivel_dificuldade)
values ('Fácil'),
	   ('Intermediário'),
       ('Difícil'),
       ('Impossível');

insert into quiz(nivel_quiz)
values(1), (2), (3), (4);

select concat('Quiz ', q.idQuiz , ' Nível ', nivel.nivel_dificuldade) as 'Quiz', sum(rc.pontuacao) as 'Pontuação' 
from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz
            join resultados_quiz rc on rc.fkquiz = q.idQuiz
            group by q.idQuiz, nivel.nivel_dificuldade;
            
            
select u.perfil_usuario as usuario, u.acompanha_natacao, 
          count(q.idQuiz) as quizzesRespondidos, 
          sum(rc.pontuacao) as pontuacaoTotal 
  from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz
              join resultados_quiz rc on rc.fkquiz = q.idQuiz
              right join usuario u on u.idUsuario = rc.fkusuario
              group by u.perfil_usuario, u.acompanha_natacao
              order by pontuacaoTotal desc;
              
              
select u.acompanha_natacao, round(sum(rc.pontuacao) / count(rc.fkquiz),2) 
as media_da_pontuacao from resultados_quiz rc 
join usuario u on u.idUsuario = rc.fkusuario 
group by u.acompanha_natacao;

select u.acompanha_natacao, round(avg(rc.acertos)) as media_acertos
from resultados_quiz rc join usuario u on u.idUsuario = rc.fkusuario
group by u.acompanha_natacao;


select nv.nivel_dificuldade as nivel, max(rc.pontuacao) as pontuacao
from resultados_quiz rc join quiz q on q.idQuiz = rc.fkquiz
						join nivel_quiz nv on nv.idNivel_quiz = q.nivel_quiz
                        where rc.fkusuario = 1
                        group by nivel;
                        
select date_format(data_realizacao, '%d/%m') as data_realização, pontuacao
from resultados_quiz
where fkusuario = 1
order by data_realizacao;

-- create user 'swimlympics_api'@'%' identified by 'Swimlympics@123';
