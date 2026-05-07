    function entrar() {
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (!emailVar || !senhaVar) {
        alert("Preencha todos os campos!");
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(function(json) {
                console.log(json);
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.POSICAO_USUARIO = json.posicao;
                sessionStorage.OVERAL_USUARIO = json.overal;
                alert("Login realizado com sucesso!");
                window.location.href = "dashboard.html";
            });
        } else {
            resposta.text().then(function(texto) {
                alert("Email e/ou senha inválidos!");
                console.error(texto);
            });
        }
    }).catch(function(erro) {
        console.log(erro);
        alert("Erro ao conectar com o servidor!");
    });
}
