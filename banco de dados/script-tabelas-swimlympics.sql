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

select * from usuario;

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
idResultado int primary key not null auto_increment,
fkusuario int not null,
fkquiz int not null,
total_perguntas int not null,
acertos int not null,
data_realizacao datetime default current_timestamp,
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

select concat('Quiz ', q.idQuiz , ' Nível ', nivel.nivel_dificuldade) as 'Quiz'
from quiz q join nivel_quiz nivel on q.nivel_quiz = nivel.idNivel_quiz;

-- create user 'swimlympics_api'@'%' identified by 'Swimlympics@123';
