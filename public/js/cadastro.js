    let listaEmpresasCadastradas = [];

    function cadastrar() {
        // aguardar();

        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
        var nomeVar = ipt_nome.value;
        var emailVar = ipt_email.value;
        var senhaVar = ipt_senha.value;
        var senhaConfVar = ipt_senhaConf.value;
        var posicaoVar = ipt_posicao.value;
        var dribleVar = ipt_dri.value;
        var finalizacaoVar = ipt_fin.value;
        var fisicoVar = ipt_fis.value;
        var passeVar = ipt_pas.value;
        var velocidadeVar = ipt_vel.value
        var defesaVar = ipt_def.value

        if (!nomeVar || !posicaoVar || !emailVar || !senhaVar || !senhaConfVar) {
            alert("Preencha todos os campos")
            return;
        }

        let emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRgx.test(emailVar)) {
            alert("Email Inválido")
            return;
        }

        if (senhaVar.length < 5) {
            alert("Sua senha precisa de mais que 5 caracteres")
            return;
        }

        if (senhaVar != senhaConfVar) {
            alert("Suas Senhas não coincidem")
            return;
        }

        let posicoesValidas = ["GOL", "ZAG", "LD", "LE", "VOL", "MC", "MEI", "PD", "ATA", "PE"]
        let posicaoEncontrada = false;

        for (let i = 0; i < posicoesValidas.length; i++) {
            if (posicaoVar.toUpperCase() === posicoesValidas[i]) {
                posicaoEncontrada = true
                break;
            }
        }

        if (!posicaoEncontrada) {
            alert("Posicão Inválida ")
            return;
        }

        if (dribleVar < 0 || dribleVar > 99) {
            alert("Drible deve estar entre 0 e 99!");
            return;
        }
        if (finalizacaoVar < 0 || finalizacaoVar > 99) {
            alert("Finalização deve estar entre 0 e 99!");
            return;
        }
        if (fisicoVar < 0 || fisicoVar > 99) {
            alert("Fisico deve estar entre 0 e 99!");
            return;
        }
        if (passeVar < 0 || passeVar > 99) {
            alert("Passe deve estar entre 0 e 99!");
            return;
        }
        if (velocidadeVar < 0 || velocidadeVar > 99) {
            alert("Velocidade deve estar entre 0 e 99!");
            return;
        }
        if (defesaVar < 0 || defesaVar > 99) {
            alert("Defesa deve estar entre 0 e 99!");
            return;
        }

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                senhaConfServer: senhaConfVar,
                posicaoServer: posicaoVar,
                dribleServer: dribleVar,
                finalizacaoServer: finalizacaoVar,
                fisicoServer: fisicoVar,
                passeServer: passeVar,
                velocidadeServer: velocidadeVar,
                defesaServer: defesaVar
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                alert("Conta criada com sucesso!");
                window.location.href = "login.html";
            } else {
                alert("Erro ao criar conta!");
            }
        }).catch(function (erro) {
            console.log(erro);
            alert("Erro ao conectar com o servidor!");
        });
    }

