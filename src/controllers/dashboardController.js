var dahsboardModel = require("../models/dashboardModel");

function buscarDadosParaPlotar(req,res){
   var fkUser = req.query.fkUser
   var fk_jogador_mockado = req.query.fk_jogador_mockado

   dahsboardModel.buscarDadosParaPlotar(fkUser, fk_jogador_mockado)
    .then(function(resultado){
        if(resultado.length > 0){
            res.json(resultado[0]);
        } else {
            res.status(404).json("Nenhum dado encontrado")
        }
    })
    .catch(function(erro){
        console.error("Erro ao buscar dados para plotar no gráfico")
        res.status(500).json("Erro interno do Servidor")
    })

}

module.exports = {
buscarDadosParaPlotar
};