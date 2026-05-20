var database = require("../database/config");

function buscarDadosParaPlotar(fkUser, fk_jogador_mockado){
    var instrucaoSql = `SELECT * FROM vw_grafico WHERE id = ${fkUser} AND id_mockado = ${fk_jogador_mockado}`
    return database.executar(instrucaoSql)
}

module.exports = {buscarDadosParaPlotar}