// Array para armazenar empresas cadastradas para validação de código de ativação 

let listaEmpresasCadastradas = [];

function listar() {
    fetch("/empresas/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    listaEmpresasCadastradas.push(empresa);
                    console.log("listaEmpresasCadastradas")
                    console.log(listaEmpresasCadastradas[0].codigo_ativacao)
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

listar();


function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var telefoneVar = input_telefone.value
    var cpfVar = input_cpf.value;
    var senhaVar = input_senha.value;
    var confirmacaoSenhaVar = input_confirmar_senha.value;
    var codigoVar = input_codigo_ativacao.value;
    var idEmpresaVincular

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        telefoneVar == "" ||
        cpfVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == "" ||
        codigoVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else if (senhaVar !== confirmacaoSenhaVar) {
        alert('As senhas precisam ser iguais!')
    }

    // Verificando se o código de ativação é de alguma empresa cadastrada
    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
        if (listaEmpresasCadastradas[i].codigoEmpresa == codigoVar) {
            idEmpresaVincular = listaEmpresasCadastradas[i].idEmpresa
            console.log("Código de ativação válido.");
            break;
        } else {
            // cardErro.style.display = "block";
            // mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
            finalizarAguardar();
        }
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            cpfServer: cpfVar,
            senhaServer: senhaVar,
            idEmpresaVincularServer: idEmpresaVincular
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                // mensagem_erro.innerHTML =
                //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "../login.html";
                }, "2000");

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

    return false;
}

// Listando empresas cadastradas 

function sumirMensagem() {
    cardErro.style.display = "none";
}



function validarEmail() { //Função para validar o email
    var email = input_email.value
    var contador = 0

    if (email.endsWith('sptech.school') || //Se o email terminar com algumas dessas opções, entre no loop (while)
        email.endsWith('.com') ||
        email.endsWith('.com.br')) {

        while (contador < email.length) { //Enquanto o contador for menor que o tamanho do texto
            contador++

            if (email[contador] == '@') { //Percorrendo cada posição do email do usuário para verificar se existe o caractere "@"
                input_email.style.border = 'solid 2px #28DF99'
                email_span.innerHTML = ''
            }
        }
    } else {
        input_email.style.border = 'solid 2px red'
        email_span.innerHTML = 'Formato de email inválido'
    }
}

function validarNome() { //Função para verificar se é um nome válido
    var nome = input_nome.value
    var contador = 0

    while (contador < nome.length) { //Enquanto o contador for menor que o tamanho do nome
        if (nome.length <= 1) { //Se o tamanho do nome for menor ou igual a 1, o nome é inválido
            input_nome.style.border = 'solid 2px red'
            nome_span.innerHTML = 'Insira um nome válido'
        } else {
            input_nome.style.border = 'solid 2px #28DF99'
            nome_span.innerHTML = ''
        }

        contador++
    }
}

function validarTelefone() { //Função que verifica se o telefone é válido
    var telefone = input_telefone.value
    var contador = 0

    while (contador < 15) { //Enquanto o contador for menor que 15(Número de caracteres máximo do telefone com as formatações)
        contador++
        if (telefone.length == 15) { //Se o tamanho do telefone for igual a 15, ele é válido
            telefone_span.innerHTML = ''
            input_telefone.style.border = 'solid 2px #28DF99'
        } else {
            telefone_span.innerHTML = 'Formato de telefone inválido'
            input_telefone.style.border = 'solid 2px red'
        }
    }

    //Formatação do telefone
    if (telefone.length == 2) { //Se o tamanho do telefone for igual a dois, adiciona parênteses entre os número
        input_telefone.value = '(' + telefone + ') '
    } else if (telefone.length == 10) { //Se o tamanho do telefone for igual a 10, adiciona um traço antes dos 4 últimos números
        input_telefone.value += '-'
    }
}

function validarCpf() { // Função que valida o CPF
    var cpf = input_cpf.value
    var contador = 0

    while (contador < 14) { //Enquanto o contador for menor que 14(Número máximo de caracteres com a formatação do CPF)
        contador++

        if (cpf.length == 14) { //Se o tamanho do CPF inserido for igual a 14, ele é válido
            cpf_span.innerHTML = ''
            input_cpf.style.border = 'solid 2px #28DF99'
        } else {
            cpf_span.innerHTML = 'Formato de CPF inválido'
            input_cpf.style.border = 'solid 2px red'
        }

    }

    if (cpf.length == 3 || cpf.length == 7) { //Se o tamanho do CPF for igual a 3 ou igual a 7, adiciona um ponto antes dos números seguintes
        input_cpf.value += '.'
    } else if (cpf.length == 11) { //Se o tamanho do CPF inserido for igual a 11, adiciona um traço antes dos dígitos finais
        input_cpf.value += '-'
    }
}

function validarSenha() { //Função que valida a Senha inserida
    var senha = input_senha.value

    if (senha.length < 8) { //Se o tamanho da senha for menor que 8 caracteres, ela não será válida
        senha_span.innerHTML = 'Senha necessita de, no mínimo, 8 caracteres'
        input_senha.style.border = 'solid 2px red'
    } else {
        senha_span.innerHTML = ''
        input_senha.style.border = 'solid 2px #28DF99'
    }
}

function validarSenhaRepetida() { //Função que valida a senha repetida
    var senha = input_senha.value
    var senhaRepetida = input_confirmar_senha.value

    if (senhaRepetida !== senha || senhaRepetida.length < 8) { //Se as senhas forem diferentes ou se o tamanho da senha repetida for menor que 8, a senha repetida será inválida
        confirmar_senha_span.innerHTML = 'As senhas precisam ser iguais'
        input_confirmar_senha.style.border = 'solid 2px red'
    } else {
        confirmar_senha_span.innerHTML = ''
        input_confirmar_senha.style.border = 'solid 2px #28DF99'
    }
}

function validarCodigoAtivacao() {
    var codigoAtivacao = input_codigo_ativacao.value

    if (codigoAtivacao.length < 5) {
        codigo_ativacao_span.innerHTML = 'Insira um código válido'
        input_codigo_ativacao.style.border = 'solid 2px red'
    } else {
        codigo_ativacao_span.innerHTML = ''
        input_codigo_ativacao.style.border = 'solid 2px #28DF99'
    }
}