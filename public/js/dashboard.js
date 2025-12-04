nome_usuario.innerHTML += sessionStorage.NOME_USUARIO
var camaras = JSON.parse(sessionStorage.CAMARA)

sessionStorage.CAMARA_ATUAL = 0;


// para criar as camaras na navbar
for (var i = 0; i < camaras.length; i++) {
    var idCamaraFria = camaras[i].idCamaraFria
    nav_link.innerHTML += `<a href="camara.html" onclick="EscolherCamara(${idCamaraFria})">${camaras[i].nome}</a>`
}

// function listar Camaras
for (var i = 0; i < camaras.length; i++) {

    var idCamaraFria = camaras[i].idCamaraFria

    container_camaras.innerHTML += `
    <div class="card-camara" onclick="EscolherCamara(${idCamaraFria})">
        <div class="info-camara">
            <div class="nome-camara">${camaras[i].nome}</div>
        </div>
        <div class="sensores-container">
            <div class="linha-sensor">
                <div class="sensor-card" id="card_evaporador">
                    <div class="sensor-nome">Sensor Evaporador</div>
                    <div class="sensor-status" id="sensor_evaporador"></div>
                </div>
                <div class="sensor-card" id="card_condensador">
                    <div class="sensor-nome">Sensor Condensador</div>
                    <div class="sensor-status" id="sensor_condensador"></div>
                </div>
            </div>
            <div class="linha-sensor">
                <div class="sensor-card" id="card_compressor">
                    <div class="sensor-nome">Sensor Compressor</div>
                    <div class="sensor-status" id="sensor_compressor"></div>
                </div>
                <div class="sensor-card" id="card_valvula">
                    <div class="sensor-nome">Valvula de expansão</div>
                    <div class="sensor-status" id="sensor_valvula"></div>
                </div>
            </div>
        </div>
    </div>`
}

function EscolherCamara(idCamaraFria) {
    sessionStorage.CAMARA_ATUAL = idCamaraFria
    console.log('camara escolhida foi' + idCamaraFria)
    window.location.href = `./camara.html`
}




// apenas teste não esta 100% funcional 
var idCamara = 1
function buscarMedidasEmTempoReal() {
    fetch(`/medidas/tempo-real/${idCamara}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                var totalCritico = 0
                var totalAlerta = 0
                var totalRisco = 0
                var totalSeguro = 0


                for (var i = 0; i < resposta.length; i++) {
                    var ppm = Number(resposta[i].valorPPM)

                    if (ppm < 5) {
                        totalSeguro++
                    } else if (ppm <= 25) {
                        totalAlerta++
                    } else if (ppm <= 50) {
                        totalRisco++
                    } else {
                        totalCritico++
                    }
                }

                total_seguro.innerHTML = `${totalSeguro}`
                total_alerta.innerHTML = `${totalAlerta}`
                total_risco.innerHTML = `${totalRisco}`
                total_critico.innerHTML = `${totalCritico}`

                var evaporador = resposta[0].valorPPM
                var compressor = resposta[1].valorPPM
                var condensador = resposta[2].valorPPM
                var valvula = resposta[3].valorPPM

                // EVAPORADOR
                if (evaporador <= 5) {
                    sensor_evaporador.innerHTML = `Seguro`;
                } else if (evaporador >= 6 && evaporador <= 25) {
                    sensor_evaporador.innerHTML = `Risco Alto`;
                    card_evaporador.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                    sensor_evaporador.style.color = "white";

                } else if (evaporador >= 26 && evaporador <= 50) {
                    sensor_evaporador.innerHTML = `Alerta Crítico`;
                    card_evaporador.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                    sensor_evaporador.style.color = "white";

                } else if (evaporador > 50) {
                    sensor_evaporador.innerHTML = `Crítico`;
                    card_evaporador.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                    sensor_evaporador.style.color = "white";
                }

                // COMPRESSOR
                if (compressor <= 5) {
                    sensor_compressor.innerHTML = `Seguro`;
                } else if (compressor >= 6 && compressor <= 25) {
                    sensor_compressor.innerHTML = `Risco Alto`;
                    card_compressor.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                    sensor_compressor.style.color = "white";

                } else if (compressor >= 26 && compressor <= 50) {
                    sensor_compressor.innerHTML = `Alerta Crítico`;
                    card_compressor.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                    sensor_compressor.style.color = "white";

                } else if (compressor > 50) {
                    sensor_compressor.innerHTML = `Crítico`;
                    card_compressor.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                    sensor_compressor.style.color = "white";
                }

                // CONDENSADOR
                if (condensador <= 5) {
                    sensor_condensador.innerHTML = `Seguro`;

                } else if (condensador >= 6 && condensador <= 25) {
                    sensor_condensador.innerHTML = `Risco Alto`;
                    card_condensador.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                    sensor_condensador.style.color = "white";

                } else if (condensador >= 26 && condensador <= 50) {
                    sensor_condensador.innerHTML = `Alerta Crítico`;
                    card_condensador.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                    sensor_condensador.style.color = "white";

                } else if (condensador > 50) {
                    sensor_condensador.innerHTML = `Crítico`;
                    card_condensador.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                    sensor_condensador.style.color = "white";
                }

                // VÁLVULA
                if (valvula <= 5) {
                    sensor_valvula.innerHTML = `Seguro`;
                } else if (valvula >= 6 && valvula <= 25) {
                    sensor_valvula.innerHTML = `Risco Alto`;
                    card_valvula.style.background = "linear-gradient(45deg, #ffea00, #ffd600)";
                    sensor_valvula.style.color = "white";

                } else if (valvula >= 26 && valvula <= 50) {
                    sensor_valvula.innerHTML = `Alerta Crítico`;
                    card_valvula.style.background = "linear-gradient(45deg, #f57c00, #ff9800)";
                    sensor_valvula.style.color = "white";

                } else if (valvula > 50) {
                    sensor_valvula.innerHTML = `Crítico`;
                    card_valvula.style.background = "linear-gradient(45deg, #d32f2f, #f44336)";
                    sensor_valvula.style.color = "white";
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

setInterval(() => {
    buscarMedidasEmTempoReal();
}, 1000); 
