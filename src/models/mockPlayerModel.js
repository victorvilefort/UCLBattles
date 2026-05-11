var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `
    SELECT 
      id_mockado,
      nome,
      posicao,
      drible,
      finalizacao,
      fisico,
      passe,
      velocidade,
      defesa,
      foto,
      ROUND((drible + finalizacao + fisico + passe + velocidade + defesa) / 6.0) AS overall
    FROM jogador_mockado
    WHERE id_mockado = '${id}'
  `;
  return database.executar(instrucaoSql);
}

module.exports = {buscarPorId};