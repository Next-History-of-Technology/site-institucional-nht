//Gráfico de Linha

var medidasEvaporador = []
var medidasCompressor = []
var medidasCondensador = []
var medidasValvula = []

const ctxLine = document.getElementById('myChartLine');

var chartLine = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['12:40', '12:41', '12:42', '12:43', '12:44', '12:45'],
        datasets: [
            {
                label: 'Sensor Válvula de Expansão',
                data: medidasValvula,
                borderColor: '#6C63FF',
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                tension: 0.4,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6C63FF',
                borderWidth: 2
            },
            {
                label: 'Sensor Evaporador',
                data: medidasEvaporador,
                borderColor: '#C649FC',/*cor da linha*/
                tension: 0.4,/*suaviza as linhas deixando de ser linhas retas */
                pointBackgroundColor: '#C649FC',/*cor da bolinha*/
                pointBorderColor: '#fff',/*cor da borda da bolinha*/
                pointHoverBackgroundColor: '#fff',/*cor da bolinha ao passar o mouse*/
                pointHoverBorderColor: '#C649FC',/*cor da borda da bolinha ao passar o mojse*/
                borderWidth: 2 /*tamanho da linha*/
            },
            {
                label: 'Sensor Condensador',
                data: medidasCondensador,
                borderColor: '#0cc2f0',
                tension: 0.4,
                pointBackgroundColor: '#0cc2f0',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0cc2f0',
                borderWidth: 2
            },
            {
                label: 'Sensor Compressor',
                data: medidasCompressor,
                borderColor: '#12be8b',
                tension: 0.4,
                pointBackgroundColor: '#12be8b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#12be8b',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 13,
                        family: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#6C63FF',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderWidth: 0,
                padding: 10
            }
        },
        scales: {
            x: {
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.10)' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.10)' }
            }
        }
    }
});

var idCamara = sessionStorage.CAMARA_ATUAL;

function obterDadosLeituras() {
    fetch(`/medidas/obter-dados-leituras/${idCamara}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    resposta.forEach(medida => {
                        if (medida.nomeLocal === 'evaporador') {
                            medidasEvaporador.push(medida.valorPPM)
                        }

                        if (medida.nomeLocal === 'compressor') {
                            medidasCompressor.push(medida.valorPPM)
                        }

                        if (medida.nomeLocal == 'condensador') {
                            medidasCondensador.push(medida.valorPPM)
                        }

                        if (medida.nomeLocal == 'válvula de expansão') {
                            medidasValvula.push(medida.valorPPM)
                        }
                    });

                    chartLine.update()
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

obterDadosLeituras()