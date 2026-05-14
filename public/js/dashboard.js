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
            document.getElementById("enemy-foto").src =
              `assets/img/${jogador.foto}`;
          })
          .catch((err) => console.error("Erro ao buscar jogador:", err));
      }

      function registrarComparacao(fk_jogador_mockado){
        var fkUser = sessionStorage.ID_USUARIO
        fetch("/comparacao/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkJogadorMockadoServer: fk_jogador_mockado,
                fkUserServer: fkUser
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Comparacão registrada com sucesso!");
            } else {
                console.log("Erro ao registrar a comparacao!");
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
          var rows = document.querySelectorAll(".player-row");
        for (var i = 0; i < data.length; i++) {
            rows[i].querySelector("img").src = `assets/img/${data[i].foto}`;
            rows[i].querySelector(".player-name").textContent = data[i].nome;
            rows[i].querySelector(".count p").textContent = data[i].vezes + "x"
          }
        })
        .catch((error) => console.error("Erro ao buscar top 5:", error))
      }

      function mostrarTotalComparacoes(){
        fetch(`/comparacao/total-comparacoes`)
        .then((res) => res.json())
        .then((data) =>{
           document.querySelector(".big-number p").textContent = data[0]["Comparações Feitas"];
        })
        .catch((error) => console.error("Nenhuma comparação feita", error))
      }

      carregarInfos();
      listarTopCinco();
      mostrarTotalComparacoes()
