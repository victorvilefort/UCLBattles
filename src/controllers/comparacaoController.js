var comparacaoModel = require("../models/comparacaoModel");

function registrarComparacao(req, res) {
    var id_comparacao = req.body.idComparacaoServer;
    var fk_jogador_mockado = req.body.fkJogadorMockadoServer;
    var fkUser = req.body.fkUserServer;

    if (id_comparacao == undefined) {
        res.status(400).send("id_comparacao está undefined!");
    } else if (fk_jogador_mockado == undefined) {
        res.status(400).send("fk_jogador_mockado está indefinida!");
    } else if (fkUser == undefined) {
        res.status(400).send("fkUser está indefinida!");
    } else {
        comparacaoModel.registrarComparacao(id_comparacao, fk_jogador_mockado, fkUser)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("id_comparacao, fk_jogador_mockado ou fkUser estão undefined");
                } else {
                    res.status(400).send("Comparação registrada com sucesso!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarTopCinco(req, res) {
    comparacaoModel.listarTopCinco()
        .then((resultado) => {
            if(!resultado || resultado.length == 0){
                return res.status(404).json("nenhuma comparação encontrada")
            }
            return res.status(200).json(resultado)
        })
}

function mostrarTotalComparacoes(req, res) {
    comparacaoModel.mostrarTotalComparacoes()
           .then((resultado) => {
            if(!resultado || resultado.length == 0){
                return res.status(404).json("nenhuma comparação encontrada")
            }
            return res.status(200).json(resultado)
        })
}


module.exports = {
    registrarComparacao,
    listarTopCinco,
    mostrarTotalComparacoes,
};