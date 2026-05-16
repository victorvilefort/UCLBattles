var database = require("../database/config");

function buscarStatsMockado(id_mockado){
    var instrucaoSql = `SELECT * FROM jogador_mockado WHERE id_mockado = ${id_mockado}`
    return database.executar(instrucaoSql)
}

function buscarStatsUsuario(fkUser){
    var instrucaoSql = `SELECT * FROM stats_player WHERE id_stats = ${fkUser}`
    return database.executar(instrucaoSql)
}

module.exports = {buscarStatsMockado , buscarStatsUsuario}