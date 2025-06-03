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

select * from resultados_quiz;

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
data_realizacao datetime default current_timestamp,
primary key(idResultado, fkusuario, fkquiz),
foreign key (fkusuario) references usuario(idUsuario),
foreign key (fkquiz) references quiz(idQuiz)
);

-- inserindo os niveis de quiz
insert into nivel_quiz(nivel_dificuldade)
values ('Fácil'),
	   ('Intermediário'),
       ('Difícil'),
       ('Impossível');

insert into quiz(nivel_quiz)
values(1), (2), (3), (4);

select concat('Quiz ', q.idQuiz , ' Nível ', nivel.nivel_dificuldade) as 'Quiz', (rc.acertos * 50) as 'Pontuação' 
from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz
            join resultados_quiz rc on rc.fkquiz = q.idQuiz;
            
select u.perfil_usuario as 'usuário', u.acompanha_natacao, count(q.idQuiz) as 'Quizzes respondidos', sum(rc.acertos * 10) as 'Pontuação Total' 
from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz
            -- join resultados_quiz rc on rc.fkquiz = q.idQuiz
            join usuario u on u.idUsuario = rc.fkusuario
            join (select * from resultados_quiz order by acertos) as x
            group by u.perfil_usuario, u.acompanha_natacao;

-- create user 'swimlympics_api'@'%' identified by 'Swimlympics@123';
