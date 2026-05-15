var database = require("../database/config");

function registrarComparacao(fk_jogador_mockado, fkUser) {
var instrucaoSql = `INSERT INTO comparacao (fk_jogador_mockado, fkUser) VALUES (${fk_jogador_mockado}, ${fkUser})`;
return database.executar(instrucaoSql);
}

function listarTopCinco (fkUser) {
  var instrucaoSql = `
    SELECT j.nome, j.foto, COUNT(*) AS vezes
    FROM comparacao c
    JOIN jogador_mockado j ON j.id_mockado = c.fk_jogador_mockado
    WHERE c.fkUser = ${fkUser}
    GROUP BY c.fk_jogador_mockado
    ORDER BY vezes DESC
    LIMIT 5;
  `;
  return database.executar(instrucaoSql);
}

function mostrarTotalComparacoes(fkUser) {
  var instrucaoSql = `SELECT COUNT(*) AS "Comparações Feitas" FROM comparacao WHERE fkUser = ${fkUser}`;
  return database.executar(instrucaoSql);
}

function buscarDiferencaOveral(fkUser,fk_jogador_mockado){
  var instrucaoSql = `SELECT * FROM vw_diferenca WHERE id_usuario = ${fkUser} AND id_mockado = ${fk_jogador_mockado}`
  return database.executar(instrucaoSql)
}

module.exports = {registrarComparacao, listarTopCinco, mostrarTotalComparacoes, buscarDiferencaOveral};
