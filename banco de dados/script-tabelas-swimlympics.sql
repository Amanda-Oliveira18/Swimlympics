create database swimlympics;

use swimlympics;

create table usuario (
idUsuario int primary key not null auto_increment,
nome varchar(100) not null,
perfil_usuario varchar(50) not null,
email varchar(255) not null,
senha varchar(255) not null,
acompanha_natacao char(3) not null
);

create table nivel_quiz (
idNivel_quiz int primary key not null auto_increment,
nivel_dificuldade varchar(20) not null
);

create table quiz(
idQuiz int primary key not null auto_increment,
nivel_dificuldade int not null,
foreign key (nivel_dificuldade) references nivel_quiz(idNivel)
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



