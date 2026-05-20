function carregarInfos() {
  let nomeUsuario = sessionStorage.NOME_USUARIO;
  let posicaoUsuario = sessionStorage.POSICAO_USUARIO;
  let overalUsuario = sessionStorage.OVERAL_USUARIO;

  document.getElementById("username").innerHTML = `<p>${nomeUsuario}</p>`;
  document.getElementById("user_position").innerHTML = `<p>${posicaoUsuario}</p>`;
  document.getElementById("user_overal").innerHTML = `<h2>${overalUsuario}</h2>`;
}

function buscarPorId(id) {
  fetch(`/mockPlayer/buscar/${id}`)
    .then((res) => res.json())
    .then((jogador) => {
      console.log("Jogador selecionado:", jogador);
      document.querySelector(".box-player-big-red img").src =`assets/img/${jogador.foto}`;
      document.querySelector(".box-player-big-red .name-enemy p").textContent = jogador.nome;
      document.querySelector(".box-player-big-red .enemy-position p").textContent = jogador.posicao;
      document.querySelector(".box-player-big-red .enemy-overal-big h2").textContent = jogador.overall;
      document.getElementById("enemy-foto").src = `assets/img/${jogador.foto}`;
    })
    .catch((err) => console.error("Erro ao buscar jogador:", err));
}

function registrarComparacao(fk_jogador_mockado) {
  let fkUser = sessionStorage.ID_USUARIO;
  fetch("/comparacao/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkJogadorMockadoServer: fk_jogador_mockado,
      fkUserServer: fkUser,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log("Comparacão registrada com sucesso!");
      } else {
        console.log("Erro ao registrar a comparacao!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      alert("Erro ao conectar com o servidor!");
    });
}

let top5 = [];
function listarTopCinco() {
  let fkUser = sessionStorage.ID_USUARIO;
  fetch(`/comparacao/top-cinco?fkUser=${fkUser}`)
    .then((res) => res.json())
    .then((data) => {
      top5 = data;
      let cardTop5 = document.querySelectorAll(".player-row");
      for (let i = 0; i < data.length; i++) {
        cardTop5[i].querySelector("img").src = `assets/img/${data[i].foto}`;
        cardTop5[i].querySelector(".player-name").textContent = data[i].nome;
        cardTop5[i].querySelector(".count p").textContent = data[i].vezes + "x";
      }
    })
    .catch((error) => console.error("Erro ao buscar top 5:", error));
}

function mostrarTotalComparacoes() {
  let fkUser = sessionStorage.ID_USUARIO;
  fetch(`/comparacao/total-comparacoes?fkUser=${fkUser}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".big-number p").textContent =data[0]["Comparações Feitas"];
    })
    .catch((error) => console.error("Nenhuma comparação feita", error));
}

function mostrarMaisEscolhido() {
  var fkUser = sessionStorage.ID_USUARIO;
  fetch(`/comparacao/top-cinco?fkUser=${fkUser}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".most-chosen-card img").src = `assets/img/${data[0].foto}`;
      document.querySelector(".mc-name").textContent = data[0].nome;
    })
    .catch((error) => console.error("Erro:", error));
}

function buscarDiferencaOveral(fk_jogador_mockado) {
    var fkUser = sessionStorage.ID_USUARIO;

    if(!fk_jogador_mockado){
      document.querySelector(".banner-info-diff h3").textContent = "AGUARDANDO COMPARAÇÃO...";
      return;
    }

    fetch(`/comparacao/diferenca-overal?fkUser=${fkUser}&fk_jogador_mockado=${fk_jogador_mockado}`)
    .then((res) => res.json())
    .then((data) => {
        var diferenca = data.diferenca;
        document.querySelector(".banner-info-diff h3").textContent = diferenca > 0 ? `+${diferenca} pontos`  : `${diferenca} pontos`;
    })
    .catch((erro) => console.error(erro));
}

let graficoRadar = null;

function obterDadosGrafico(fk_jogador_mockado) {
    var fkUser = sessionStorage.ID_USUARIO;
    fetch(`/dashboard/dados-grafico?fkUser=${fkUser}&fk_jogador_mockado=${fk_jogador_mockado}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Nenhum dado encontrado");
            }
        })
        .then(function (dados) {
            plotarGrafico(dados);
        })
        .catch(function (error) {
            console.error(`Erro ao obter dados para gráfico: ${error.message}`);
        });
}

       function plotarGrafico(dados) {


        if (graficoRadar) {
          graficoRadar.destroy();
       }

        console.log('iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels
        // Criando estrutura para plotar gráfico - dados
      graficoRadar = new Chart(document.getElementById("radarChart"), {
      type: "radar",
      data: {
        labels: [
          "Drible",
          "Finalização",
          "Físico",
          "Passe",
          "Velocidade",
          "Defesa",
        ],
        datasets: [
          {
            label: "Seu jogador",
            data: [dados.user_drible,
            dados.user_finalizacao,
            dados.user_fisico,
            dados.user_velocidade,
            dados.user_passe,
            dados.user_defesa],
            borderColor: "#FFD700",
            backgroundColor: "rgba(255, 215, 0, 0.15)",
            pointBackgroundColor: "#FFD700",
            borderWidth: 2,
            pointRadius: 4,
          },
          {
            label: "Adversário",
            data: [dados.adv_drible,
              dados.adv_finalizacao,
              dados.adv_fisico,
              dados.adv_passe,
              dados.adv_velocidade,
              dados.adv_defesa
            ],
            borderColor: "#00FFFF",
            backgroundColor: "rgba(0, 255, 255, 0.10)",
            pointBackgroundColor: "#00FFFF",
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: {
          r: {
            min: 0,
            max: 99,
            ticks: { stepSize: 10, backdropColor: "transparent" },
            grid: {
              color: "rgba(255, 255, 255, 0.4)", // <- cor das linhas da grade
            },
          },
        },
      },
    });

        console.log('----------------------------------------------')
        console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
        console.log(resposta)
      }

carregarInfos();
listarTopCinco();
mostrarTotalComparacoes();
mostrarMaisEscolhido();
buscarDiferencaOveral();
obterDadosGrafico();
