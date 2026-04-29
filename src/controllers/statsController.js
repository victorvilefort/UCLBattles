var statsModel = require("../models/statsModel");
const { cadastrarStats } = require("../models/usuarioModel");

function cadastrar(req, res) {
    var posicao = req.body.posicaoServer;
    var drible = req.body.dribleServer;
    var finalizacao = req.body.finalizacaoServer;
    var fisico = req.body.fisicoServer;
    var passe = req.body.passeServer;
    var velocidade = req.body.velocidadeServer;
    var defesa = req.body.defesaServer;

    if (posicao == undefined) {
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
        statsModel.cadastrar(posicao, drible, finalizacao, fisico, passe, velocidade, defesa)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarStats
};