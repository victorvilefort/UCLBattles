var database = require("../database/config");

function registrarComparacao(idJogador) {
  var instrucaoSql = `INSERT INTO comparacao (fk_jogador_mockado) VALUES (?)`;
  return database.executar(instrucaoSql, [idJogador]);
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
  var instrucaoSql = `SELECT COUNT(*) AS total FROM comparacao`;
  return database.executar(instrucaoSql);
}

module.exports = { registrarComparacao, listarTopCinco, mostrarTotalComparacoes};
