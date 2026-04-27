function createAccount(){
    let nome = (ipt_nome.value).trim()
    let posicao = (ipt_posicao.value).trim()
    let email = (ipt_email.value).trim()
    let senha = (ipt_senha.value).trim()
    let senhaConfirm = (ipt_senhaConf.value).trim()

    let drible = Number(ipt_dri.value)
    let finalizacao = Number(ipt_fin.value)
    let fisico = Number(ipt_fis.value)
    let passe = Number(ipt_pas.value)
    let velocidade = Number(ipt_vel.value)
    let defesa = Number(ipt_def.value)

    if(!nome || !posicao || !email || !senha || !senhaConfirm){
        alert("Preencha todos os campos")
        return;
    }

    let emailRgx =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRgx.test(email)){
        alert ("Email Inválido")
        return;
    }

    if(senha.length < 5){
        alert("Sua senha precisa de mais que 5 caracteres")
        return;
    }

    if(senha != senhaConfirm){
        alert("Suas Senhas não coincidem")
        return;
    }

    let posicoesValidas = ["GOL","ZAG","LD","LE","VOL","MC","MEI","PD","ATA","PE"]
    let posicaoEncontrada = false;

    for (let i = 0; i < posicoesValidas.length; i++) {
        if(posicao.toUpperCase() === posicoesValidas[i]){
            posicaoEncontrada = true
            break;
        } 
    }

    if(!posicaoEncontrada){
        alert ("Posicão Inválida ")
        return;
    }
    
    if(drible < 0 || drible > 99){
     alert("Drible deve estar entre 0 e 99!");
     return;
    }
      if(finalizacao < 0 || finalizacao > 99){
     alert("Finalização deve estar entre 0 e 99!");
     return;
    }
      if(fisico < 0 || fisico > 99){
     alert("Fisico deve estar entre 0 e 99!");
     return;
    }
      if(passe < 0 || passe > 99){
     alert("Passe deve estar entre 0 e 99!");
     return;
    }
      if(velocidade < 0 || velocidade > 99){
     alert("Velocidade deve estar entre 0 e 99!");
     return;
    }
      if(defesa < 0 || defesa > 99){
     alert("Defesa deve estar entre 0 e 99!");
     return;
    }

    alert("Conta criada com sucesso!")
    window.location.href = "login.html"
}