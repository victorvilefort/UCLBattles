var usuarioModel = require("../models/usuarioModel");
var statsModel = require("../models/statsModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } 

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var senhaConf = req.body.senhaConfServer;
    var posicao = req.body.posicaoServer;
    var drible = req.body.dribleServer
    var finalizacao = req.body.finalizacaoServer
    var fisico = req.body.fisicoServer
    var passe = req.body.passeServer
    var velocidade = req.body.velocidadeServer
    var defesa = req.body.defesaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (senhaConf == undefined) {
        res.status(400).send("Sua confirmação de senhan está undefined!");
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
    }

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, senhaConf, posicao, drible , finalizacao , fisico , passe , velocidade, defesa)
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


module.exports = {
    autenticar,
    cadastrar
    }   
}