var usuarioModel = require("../models/usuarioModel");
var statsModel = require("./models/statsModel")

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        statsModel.autenticar(posicao, drible , finalizacao , fisico , passe , velocidade, defesa)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        statsModel.buscarStatsPorUsuario(resultadoAutenticar[0].fk_stats)
                            .then((resultadoStats) => {
                                if (resultadoStats.length > 0) {
                                    res.json({
                                        posicao: resultadoAutenticar[0].posicao,
                                        drible: resultadoAutenticar[0].drible,
                                        finalizacao: resultadoAutenticar[0].finalizacao,
                                        fisico: resultadoAutenticar[0].nome,
                                        passe: resultadoAutenticar[0].senha,
                                        velocidade: resultadoAutenticar[0].velocidade,
                                        defesa:resultadoAutenticar[0].defesa,
                                        stats: resultadoStats
                                    });
                                } else {
                                    res.status(204).json({ stats: [] });
                                }
                            })
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
    var posicao = req.body.posicaoServer;
    var drible = req.body.dribleServer
    var finalizacao = req.body.finalizacaoServer
    var fisico = req.body.fisicoServer
    var passe = req.body.passeServer
    var velocidade = req.body.velocidadeServer
    var defesa = req.body.defesaServer

    // Faça as validações dos valores
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
    }

        // Passe os valores como parâmetro e vá para o arquivo statsModel.js
        statsModel.cadastrar(posicao, drible , finalizacao , fisico , passe , velocidade, defesa)
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