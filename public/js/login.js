var teste = []
function entrar() {
    // aguardar();

    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (emailVar == "" || senhaVar == "") {
        // cardErro.style.display = "block"
        // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        // finalizarAguardar();
        return false;
    }
    else {
        // setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.TIPO_USUARIO = json.tipo
                sessionStorage.CAMARA = JSON.stringify(json.camaras)
                teste.push(json)

                if (json.tipo == 'suporte') {
                    setTimeout(function () {
                        window.location.href = "../bobia.html";
                    }, 1000)
                } else {
                    setTimeout(function () {
                        window.location.href = "../dashboard/dashboard.html";
                    }, 1000); // apenas para exibir o loading
                }
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }