var comparacaoModel = require("../models/comparacaoModel");

function registrarComparacao(req, res) {
    var fk_jogador_mockado = req.body.fkJogadorMockadoServer;
    var fkUser = req.body.fkUserServer;

    if (fk_jogador_mockado == undefined) {
        res.status(400).send("fk_jogador_mockado está undefined!")
    } else if (fkUser == undefined) {
        res.status(400).send("fkUser está indefinida!");
    } else {
        comparacaoModel.registrarComparacao(fk_jogador_mockado, fkUser)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("fk_jogador_mockado ou fkUser estão undefined");
                } else {
                    res.status(200).send("Comparação registrada com sucesso!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarTopCinco(req, res) {
    let fkUser = req.query.fkUser
    console.log("fkUser no controller:", fkUser);
    comparacaoModel.listarTopCinco(fkUser)
        .then((resultado) => {
            if(!resultado || resultado.length == 0){
                return res.status(404).json("nenhuma comparação encontrada")
            }
            return res.status(200).json(resultado)
        })
}

function mostrarTotalComparacoes(req, res) {
    let fkUser = req.query.fkUser
    console.log("fkUser no controller:", fkUser);
    comparacaoModel.mostrarTotalComparacoes(fkUser)
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