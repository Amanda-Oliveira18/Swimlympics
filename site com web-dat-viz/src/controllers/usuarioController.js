var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var perfil_usuario = req.body.perfil_usuarioServer;
    var senha = req.body.senhaServer;

    if (perfil_usuario == undefined) {
        res.status(400).send("Seu perfil está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(perfil_usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            perfil_usuario: resultadoAutenticar[0].perfil_usuario,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            acompanha_natacao: resultadoAutenticar[0].acompanha_natacao
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var perfil_usuario = req.body.perfil_usuarioServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var acompanha_natacao = req.body.acompanha_natacaoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (perfil_usuario == undefined) {
        res.status(400).send("Seu nome de perfil está undefined!");
    }  else if (acompanha_natacao == undefined) {
        res.status(400).send("A pergunta acompanha a natação está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, perfil_usuario, email, senha, acompanha_natacao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}