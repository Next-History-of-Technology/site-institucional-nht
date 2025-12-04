nome_usuario.innerHTML += sessionStorage.NOME_USUARIO;
var camaras = JSON.parse(sessionStorage.CAMARA);

sessionStorage.CAMARA_ATUAL = 0;

// gerar navbar
for (var i = 0; i < camaras.length; i++) {
    var idCamaraFria = camaras[i].idCamaraFria;
    nav_link.innerHTML += `<a href="camara.html" onclick="EscolherCamara(${idCamaraFria})">${camaras[i].nome}</a>`;
}

// gerar cards das camaras
for (var i = 0; i < camaras.length; i++) {

    var idCamaraFria = camaras[i].idCamaraFria;
    container_camaras.innerHTML += `
    <div class="card-camara" id="camara_${idCamaraFria}" onclick="EscolherCamara(${idCamaraFria})">
        <div class="info-camara">
            <div class="nome-camara">${camaras[i].nome}</div>
        </div>
        <div class="sensores-container">
            <div class="linha-sensor">
                <div class="sensor-card" id="card_evaporador_${idCamaraFria}">
                    <div class="sensor-nome">Sensor Evaporador</div>
                    <div class="sensor-status" id="sensor_evaporador_${idCamaraFria}"></div>
                </div>
                <div class="sensor-card" id="card_condensador_${idCamaraFria}">
                    <div class="sensor-nome">Sensor Condensador</div>
                    <div class="sensor-status" id="sensor_condensador_${idCamaraFria}"></div>
                </div>
            </div>
            <div class="linha-sensor">
                <div class="sensor-card" id="card_compressor_${idCamaraFria}">
                    <div class="sensor-nome">Sensor Compressor</div>
                    <div class="sensor-status" id="sensor_compressor_${idCamaraFria}"></div>
                </div>
                <div class="sensor-card" id="card_valvula_${idCamaraFria}">
                    <div class="sensor-nome">Válvula de Expansão</div>
                    <div class="sensor-status" id="sensor_valvula_${idCamaraFria}"></div>
                </div>
            </div>
        </div>
    </div>`;
}

function EscolherCamara(idCamaraFria) {
    sessionStorage.CAMARA_ATUAL = idCamaraFria;
    window.location.href = "./camara.html";
}

var idEmpresa = sessionStorage.ID_EMPRESA;

function buscarMedidasEmTempoRealTodas() {
    fetch(`/medidas/tempo-real-todas/${idEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    var totalCritico = 0;
                    var totalAlerta = 0;
                    var totalRisco = 0;
                    var totalSeguro = 0;

                    var grupos = {};

                    for (var i = 0; i < resposta.length; i++) {
                        var camara = resposta[i].nomeCamara;

                        if (grupos[camara] == undefined) {
                            grupos[camara] = [];
                        }
                        grupos[camara].push(resposta[i]);
                        var ppm = Number(resposta[i].valorPPM);

                        if (ppm < 5) {
                            totalSeguro++;
                        } else if (ppm <= 25) {
                            totalAlerta++;
                        }
                        else if (ppm <= 50) {
                            totalRisco++;
                        }
                        else {
                            totalCritico++;
                        }
                    }

                    total_seguro.innerHTML = totalSeguro;
                    total_alerta.innerHTML = totalAlerta;
                    total_risco.innerHTML = totalRisco;
                    total_critico.innerHTML = totalCritico;

                    for (var i = 0; i < camaras.length; i++) {

                        var nomeCamara = camaras[i].nome;
                        var idCamaraFria = camaras[i].idCamaraFria;
                        var sensoresDaCamara = grupos[nomeCamara];

                        if (sensoresDaCamara != undefined) {

                            for (var j = 0; j < sensoresDaCamara.length; j++) {

                                var sensor = sensoresDaCamara[j];
                                var ppm = Number(sensor.valorPPM);
                                var local = sensor.nomeLocal;

                                var divSensor;
                                var card;

                                if (local == "evaporador") {
                                    divSensor = document.getElementById("sensor_evaporador_" + idCamaraFria);
                                    card = document.getElementById("card_evaporador_" + idCamaraFria);
                                } else if (local == "condensador") {
                                    divSensor = document.getElementById("sensor_condensador_" + idCamaraFria);
                                    card = document.getElementById("card_condensador_" + idCamaraFria);
                                } else if (local == "compressor") {
                                    divSensor = document.getElementById("sensor_compressor_" + idCamaraFria);
                                    card = document.getElementById("card_compressor_" + idCamaraFria);
                                } else if (local == "válvula de expansão") {
                                    divSensor = document.getElementById("sensor_valvula_" + idCamaraFria);
                                    card = document.getElementById("card_valvula_" + idCamaraFria);
                                }

                                if (divSensor != undefined) {
                                    if (ppm < 5) {
                                        divSensor.innerHTML = "Seguro";
                                        divSensor.style.color = "#28155e";
                                    } else if (ppm <= 25) {
                                        divSensor.innerHTML = "Risco Alto";
                                        card.style.background = "#ffea00";
                                        divSensor.style.color = "black";
                                    } else if (ppm <= 50) {
                                        divSensor.innerHTML = "Alerta Crítico";
                                        card.style.background = "#ff9800";
                                        divSensor.style.color = "white";
                                    } else {
                                        divSensor.innerHTML = "Crítico";
                                        card.style.background = "#d32f2f";
                                        divSensor.style.color = "white";
                                    }
                                }
                            }
                        }
                    }
                });
            }
        })
        .catch(function (error) {
            console.error("Erro:", error);
        });
}

buscarMedidasEmTempoRealTodas();
setInterval(buscarMedidasEmTempoRealTodas, 1000);
