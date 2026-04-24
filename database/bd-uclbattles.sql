
CREATE DATABASE uclbattles ;
USE uclbattles ;

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

CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  fk_stats INT NOT NULL,
  papel_user INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_stats
    FOREIGN KEY (fk_stats)
    REFERENCES stats_player(id_stats),
  CONSTRAINT fk_papel_user
    FOREIGN KEY (papel_user)
    REFERENCES user(id)
);
    
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

