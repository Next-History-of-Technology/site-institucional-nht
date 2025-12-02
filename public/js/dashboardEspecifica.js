nome_usuario.innerHTML += sessionStorage.NOME_USUARIO
var camaras = JSON.parse(sessionStorage.CAMARA)


// para criar as camaras na navbar
for (var i = 0; i < camaras.length; i++) {
    var idCamaraFria = camaras[i].idCamaraFria
    nav_link.innerHTML += `<a href="camara.html" onclick="EscolherCamara(${idCamaraFria})">${camaras[i].nome}</a>`
}

var idCamara = sessionStorage.CAMARA_ATUAL; 

function buscarMedidasEmTempoReal() {
    fetch(`/medidas/tempo-real/${idCamara}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                teste = resposta

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

setInterval(() => {
    buscarMedidasEmTempoReal();
}, 1000); 


function EscolherCamara(idCamaraFria){
    sessionStorage.CAMARA_ATUAL = idCamaraFria
    console.log('camara escolhida foi' + idCamaraFria)
    window.location.href = `./camara.html`
}