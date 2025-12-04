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

                    evaporador = resposta[0].valorPPM
                    compressor = resposta[1].valorPPM
                    condensador = resposta[2].valorPPM
                    valvula = resposta[3].valorPPM

                    // EVAPORADOR
                    if (evaporador <= 5) {
                        card_evaporador.style.background = "white";
                        evaporador_ppm_atual.style.color = "#28155e";
                    } else if (evaporador >= 6 && evaporador <= 25) {
                        card_evaporador.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                        evaporador_ppm_atual.style.color = "white";

                    } else if (evaporador >= 26 && evaporador <= 50) {

                        card_evaporador.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                        evaporador_ppm_atual.style.color = "white";

                    } else if (evaporador > 50) {
                        card_evaporador.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                        evaporador_ppm_atual.style.color = "white";
                    }

                    // COMPRESSOR
                    if (compressor <= 5) {
                        card_compressador.style.background = "white";
                        compressor_ppm_atual.style.color = "#28155e";
                    } else if (compressor >= 6 && compressor <= 25) {
                        card_compressador.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                        compressor_ppm_atual.style.color = "white";

                    } else if (compressor >= 26 && compressor <= 50) {
                        card_compressador.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                        compressor_ppm_atual.style.color = "white";

                    } else if (compressor > 50) {
                        card_compressador.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                        compressor_ppm_atual.style.color = "white";
                    }

                    // CONDENSADOR
                    if (condensador <= 5) {
                        card_condensador.style.background = "white";
                        condesador_ppm_atual.style.color = "#28155e";
                    } else if (condensador >= 6 && condensador <= 25) {
                        card_condensador.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                        condesador_ppm_atual.style.color = "white";

                    } else if (condensador >= 26 && condensador <= 50) {
                        card_condensador.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                        condesador_ppm_atual.style.color = "white";

                    } else if (condensador > 50) {
                        card_condensador.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                        condesador_ppm_atual.style.color = "white";
                    }

                    // VÁLVULA
                    if (valvula <= 5) {
                        card_valvula.style.background = "white";
                        valvula_ppm_atual.style.color = "#28155e";
                    } else if (valvula >= 6 && valvula <= 25) {
                        card_valvula.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                        valvula_ppm_atual.style.color = "white";

                    } else if (valvula >= 26 && valvula <= 50) {
                        card_valvula.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                        valvula_ppm_atual.style.color = "white";

                    } else if (valvula > 50) {
                        card_valvula.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                        valvula_ppm_atual.style.color = "white";
                    }
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

                    if (evaporador == null) {
                        evaporador = 0
                    }

                    if (compressor == null) {
                        compressor = 0
                    }

                    if (condesador == null) {
                        condesador = 0
                    }

                    if (valvula == null) {
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