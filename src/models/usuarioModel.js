var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
       SELECT u.id, u.nome, u.email, sp.posicao, ROUND((sp.drible + sp.finalizacao + sp.fisico + sp.passe + sp.velocidade + sp.defesa) / 6.0) AS Overal FROM user u JOIN stats_player sp on sp.id_stats = u.fk_stats WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarStats(posicao, drible , finalizacao , fisico , passe , velocidade, defesa) {
    console.log("ACESSEI O STATS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", posicao, drible, finalizacao, fisico, passe, velocidade, defesa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO stats_player (posicao, drible, finalizacao, fisico, passe, velocidade, defesa) VALUES ('${posicao}', '${drible}', '${finalizacao}' , '${fisico}', '${passe}', '${velocidade}', '${defesa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(nome, email, senha, fk_stats) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fk_stats);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO user (nome, email, senha, fk_stats) VALUES ('${nome}', '${email}', '${senha}','${fk_stats}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrarStats,
    cadastrarUsuario
};