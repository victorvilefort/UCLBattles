var database = require("../database/config");

function registrarComparacao(id_comparacao, fk_jogador_mockado, fkUser) {
  var instrucaoSql = `INSERT INTO comparacao (id_comparacao, fk_jogador_mockado, fkUser) 
  VALUES (${id_comparacao},${fk_jogador_mockado},${fkUser})`;
  return database.executar(instrucaoSql);
}

function listarTopCinco () {
  var instrucaoSql = `
    SELECT j.nome, j.foto, COUNT(*) AS vezes
    FROM comparacao c
    JOIN jogador_mockado j ON j.id_mockado = c.fk_jogador_mockado
    GROUP BY c.fk_jogador_mockado
    ORDER BY vezes DESC
    LIMIT 5;
  `;
  return database.executar(instrucaoSql);
}

function mostrarTotalComparacoes() {
  var instrucaoSql = `SELECT COUNT(*) AS "Comparações Feitas" FROM comparacao`;
  return database.executar(instrucaoSql);
}

module.exports = {registrarComparacao, listarTopCinco, mostrarTotalComparacoes};
