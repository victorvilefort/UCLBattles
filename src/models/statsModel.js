var database = require("../database/config");

function cadastrar(posicao, drible, finalizacao, fisico, passe, velocidade, defesa) {
    console.log("ACESSEI O STATS MODEL - function cadastrar():", posicao, drible, finalizacao, fisico, passe, velocidade, defesa);
    var instrucaoSql = `
        INSERT INTO stats_player (posicao, drible, finalizacao, fisico, passe, velocidade, defesa) 
        VALUES ('${posicao}', '${drible}', '${finalizacao}', '${fisico}', '${passe}', '${velocidade}', '${defesa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};