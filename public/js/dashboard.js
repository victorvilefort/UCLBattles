      function carregarInfos() {
        let nomeUsuario = sessionStorage.NOME_USUARIO;
        let posicaoUsuario = sessionStorage.POSICAO_USUARIO;
        let overalUsuario = sessionStorage.OVERAL_USUARIO;

        document.getElementById("username").innerHTML = `<p>${nomeUsuario}</p>`;
        document.getElementById("user_position").innerHTML =
          `<p>${posicaoUsuario}</p>`;
        document.getElementById("user_overal").innerHTML =
          `<h2>${overalUsuario}</h2>`;
      }

      function buscarPorId(id) {
        fetch(`/mockPlayer/buscar/${id}`)
          .then((res) => res.json())
          .then((jogador) => {
            console.log("Jogador selecionado:", jogador);

            document.querySelector(".box-player-big-red img").src =
              `assets/img/${jogador.foto}`;
            document.querySelector(
              ".box-player-big-red .name-enemy p",
            ).textContent = jogador.nome;
            document.querySelector(
              ".box-player-big-red .enemy-position p",
            ).textContent = jogador.posicao;
            document.querySelector(
              ".box-player-big-red .enemy-overal-big h2",
            ).textContent = jogador.overall;
            document.querySelector(
              ".box-player-big-red .enemy-overal h2",
            ).textContent = jogador.overall;
            document.getElementById("enemy-foto").src =
              `assets/img/${jogador.foto}`;
          })
          .catch((err) => console.error("Erro ao buscar jogador:", err));
      }

      function registrarComparacao(id_comparacao, fk_jogador_mockado, fkUser) {
        fetch("/comparacao/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idComparacaoServer: idComparacaoVar,
                fkJogadorMockadoServer: fkJogadorMockadoVar,
                fkUserServer: fkUserVar
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                alert("Comparacão registrada com sucesso!");
            } else {
                alert("Erro ao registrat a comparacao!");
            }
        }).catch(function (erro) {
            console.log(erro);
            alert("Erro ao conectar com o servidor!");
        });
    }

      let top5 = []
      function listarTopCinco(){
        fetch(`/comparacao/top-cinco`)
        .then((res) => res.json())
        .then((data) => {
          top5 = data
        })
        .catch((error) => console.error("Erro ao buscar top 5:", error))
      }

      function mostrarTotalComparacoes(){
        fetch(`total-comparacoes`)
        .then((res) => res.json())
        .then((data) =>{

        })
        .catch((error) => console.error("Nenhuma comparação feita", error))
      }

      carregarInfos();
