CREATE DATABASE uclbattles ;
USE uclbattles ;

-- TABELA QUE CONTÉM OS DADOS DOS JOGADORES MOCKADOS UTILIZADOS PARA A COMPARAÇÃO

CREATE TABLE jogador_mockado(
  id_mockado INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  posicao VARCHAR(40),
  drible INT NOT NULL,
  finalizacao INT NOT NULL,
  fisico INT NOT NULL,
  passe INT NOT NULL,
  velocidade INT NOT NULL,
  defesa INT NOT NULL,
  PRIMARY KEY (id_mockado));

-- Alteração da tabela para guardar as fotos dos jogadores mockados
ALTER TABLE jogador_mockado ADD COLUMN foto VARCHAR(100);
UPDATE jogador_mockado SET foto = 'messi.png' WHERE id_mockado = 1;
UPDATE jogador_mockado SET foto = 'cr7.png' WHERE id_mockado = 2;
UPDATE jogador_mockado SET foto = 'mbappe.png' WHERE id_mockado = 3;
UPDATE jogador_mockado SET foto = 'suarez.png' WHERE id_mockado = 4;
UPDATE jogador_mockado SET foto = 'neymar.png' WHERE id_mockado = 5;
UPDATE jogador_mockado SET foto = 'kane.png' WHERE id_mockado = 6;
UPDATE jogador_mockado SET foto = 'yamal.png' WHERE id_mockado = 7;
UPDATE jogador_mockado SET foto = 'olise.png' WHERE id_mockado = 8;

-- TABELA QUE CONTÉM OS STATS DO JOGADOR DO USUÁRIO

CREATE TABLE stats_player(
  id_stats INT NOT NULL AUTO_INCREMENT,
  posicao VARCHAR(40) NOT NULL,
  drible INT NOT NULL,
  finalizacao INT NOT NULL,
  fisico INT NOT NULL,
  passe INT NOT NULL,
  velocidade INT NOT NULL,
  defesa INT NOT NULL,
  PRIMARY KEY (id_stats));

-- TABELA QUE CONTÉM OS PAPEIS DE USUARIO E SUAS CREDENCIAIS

CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  fk_stats INT NOT NULL,
  papel_user VARCHAR(20),
  PRIMARY KEY (id),
  CONSTRAINT fk_user_stats
    FOREIGN KEY (fk_stats)
    REFERENCES stats_player(id_stats),
  CONSTRAINT chk_papel_user
    CHECK (papel_user IN ('admin', 'common_user'))
);
    
-- INSERT NA TABELA DOS JOGADORES MOCKADOS

INSERT INTO jogador_mockado 
(id_mockado, nome, posicao, drible, finalizacao, fisico, passe, velocidade, defesa)
VALUES
(1, 'Messi', 'Meia-Atacante', 94, 87, 64, 90, 80, 33),
(2, 'Ronaldo', 'Atacante', 80, 90, 77, 75, 77, 34),
(3, 'Mbappé', 'Atacante', 92, 90, 78, 80, 97, 36),
(4, 'Suarez', 'Atacante', 83, 88, 78, 82, 69, 45),
(5, 'Neymar', 'Meia-Atacante', 93, 85, 61, 87, 86, 37),
(6, 'Harry Kane', 'Atacante', 83, 93, 83, 84, 69, 49),
(7, 'Lamine Yamal', 'Atacante', 82, 68, 48, 72, 81, 30),
(8, 'Olise', 'Meia-atacante', 82, 73, 55, 78, 79, 40);

-- SELECT QUE OBTÉM O OVERAL(MÉDIA)
SELECT
    jm.nome,
    ROUND((jm.drible + jm.finalizacao + jm.fisico + jm.passe + jm.velocidade + jm.defesa) / 6.0) as OVERAL
FROM jogador_mockado jm
WHERE jm.id_mockado = 1
GROUP BY jm.nome;

-- SELECT QUE OBTÉM O TOP 5 DE JOGADORES MAIS ESCOLHIDOS
SELECT j.nome, j.foto, COUNT(*) AS vezes
    FROM comparacao c
    JOIN jogador_mockado j ON j.id_mockado = c.fk_jogador_mockado
    GROUP BY c.fk_jogador_mockado
    ORDER BY vezes DESC
    LIMIT 5;

-- SELECT QUE OBTÉM O TOTAL DE COMPARAÇÕES
  SELECT COUNT(*) AS total FROM comparacao;

-- VIEW QUE OBTÉM A DIFERENÇA DOS PONTOS

CREATE VIEW vw_diferenca AS
SELECT 
    u.id AS id_usuario,
    j.id_mockado AS id_mockado,
    ROUND((sp.drible + sp.finalizacao + sp.fisico + sp.passe + sp.velocidade + sp.defesa) / 6) AS overal_usuario,
    ROUND((j.drible + j.finalizacao + j.fisico + j.passe + j.velocidade + j.defesa) / 6) AS overal_mockado,
    ROUND((sp.drible + sp.finalizacao + sp.fisico + sp.passe + sp.velocidade + sp.defesa) / 6) - 
    ROUND((j.drible + j.finalizacao + j.fisico + j.passe + j.velocidade + j.defesa) / 6) AS diferenca
FROM user u
JOIN stats_player sp ON sp.id_stats = u.fk_stats
JOIN jogador_mockado j;

