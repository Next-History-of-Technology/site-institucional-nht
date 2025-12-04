nome_usuario.innerHTML += sessionStorage.NOME_USUARIO
var camaras = JSON.parse(sessionStorage.CAMARA)


// para criar as camaras na navbar
for (var i = 0; i < camaras.length; i++) {
    var idCamaraFria = camaras[i].idCamaraFria
    nav_link.innerHTML += `<a href="camara.html" onclick="EscolherCamara(${idCamaraFria})">${camaras[i].nome}</a>`
}

var idCamara = sessionStorage.CAMARA_ATUAL;

function buscarMedidasEmTempoReal() {
    fetch(`/medidas/tempo-real/${idCamara}`, { cache: 'no-store' })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                evaporador_ppm_atual.innerHTML = `${resposta[0].valorPPM} PPM`
                compressor_ppm_atual.innerHTML = `${resposta[1].valorPPM} PPM`
                condesador_ppm_atual.innerHTML = `${resposta[2].valorPPM} PPM`
                valvula_ppm_atual.innerHTML = `${resposta[3].valorPPM} PPM`
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

buscarMedidasEmTempoReal();

var teste

function buscarDiasSemVazamentos() {
    fetch(`/medidas/dias-sem-vazamento/${idCamara}`, { cache: 'no-store' })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                teste = resposta

                var evaporador = resposta[0].diasSemVazamento
                var compressor = resposta[1].diasSemVazamento
                var condesador = resposta[2].diasSemVazamento
                var valvula = resposta[3].diasSemVazamento

                if(evaporador == null){
                    evaporador = 0
                }

                if(compressor == null){
                    compressor = 0
                }

                if(condesador == null){
                    condesador = 0
                }

                if(valvula == null){
                    valvula = 0
                }

                dias_evaporador.innerHTML = `${evaporador} Dias`
                dias_compressor.innerHTML = `${compressor} Dias`
                dias_condensador.innerHTML = `${condesador} Dias`
                dias_valvula.innerHTML = `${valvula} Dias`
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

buscarDiasSemVazamentos();


setInterval(() => {
    buscarMedidasEmTempoReal();
    buscarDiasSemVazamentos();
}, 1000);


function EscolherCamara(idCamaraFria) {
    sessionStorage.CAMARA_ATUAL = idCamaraFria
    console.log('camara escolhida foi' + idCamaraFria)
    window.location.href = `./camara.html`
}