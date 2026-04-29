var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var posicao = req.body.posicaoServer;
    var drible = req.body.dribleServer;
    var finalizacao = req.body.finalizacaoServer;
    var fisico = req.body.fisicoServer;
    var passe = req.body.passeServer;
    var velocidade = req.body.velocidadeServer;
    var defesa = req.body.defesaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (posicao == undefined) {
        res.status(400).send("Sua posição está undefined!");
    } else if (drible == undefined) {
        res.status(400).send("O campo drible está undefined!");
    } else if (finalizacao == undefined) {
        res.status(400).send("O campo finalizacao está undefined!");
    } else if (fisico == undefined) {
        res.status(400).send("O campo fisico está undefined!");
    } else if (passe == undefined) {
        res.status(400).send("O campo passe está undefined!");
    } else if (velocidade == undefined) {
        res.status(400).send("O campo velocidade está undefined!");
    } else if (defesa == undefined) {
        res.status(400).send("O campo defesa está undefined!");
    } else {
        usuarioModel.cadastrarStats(posicao, drible, finalizacao, fisico, passe, velocidade, defesa)
            .then(function (resultadoStats) {
                var fk_stats = resultadoStats.insertId;

                usuarioModel.cadastrarUsuario(nome, email, senha, fk_stats)
                    .then(function (resultadoUsuario) {
                        res.json(resultadoUsuario);
                    }).catch(function (erro) {
                        console.log(erro);
                        res.status(500).json(erro.sqlMessage);
                    });
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
};