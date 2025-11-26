//Gráfico de Linha
const ctxLine = document.getElementById('myChartLine');

new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['12:40', '12:41', '12:42', '12:43', '12:44', '12:45'],
        datasets: [
            {
                label: 'Sensor Válvula de Expansão',
                data: [0, 0, 1, 5, 4, 3],
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
                data: [0, 2, 4, 3, 2, 5],
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
                data: [1, 4, 3, 1, 0, 0],
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
                data: [1, 1, 3, 2, 3, 4],
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


// Gráfico de Barras 
const ctxBarra = document.getElementById('myChartBarra');

new Chart(ctxBarra, {
    type: 'bar',
    data: {
        labels: ['Seguro', 'Baixo', 'Moderado', 'Crítico'],
        datasets: [
            {
                label: 'Total de Ocorrências', // Label único para o dataset
                data: [1, 2, 1, 2], // Valores totais para cada categoria
                backgroundColor: [
                    '#12be8b', // Seguro - verde
                    '#6C63FF', // Baixo - roxo
                    '#FFA500', // Moderado - laranja (sugestão de cor diferente)
                    '#FF4D4D'  // Crítico - vermelho (sugestão de cor diferente)
                ],
                borderColor: [
                    '#12be8b',
                    '#6C63FF',
                    '#FFA500',
                    '#FF4D4D'
                ],
                borderWidth: 1,
                borderRadius: 6
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true, // Mostra a legenda do dataset
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#6C63FF',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderWidth: 2,
                padding: 15
            }
        },
        scales: {
            x: {
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.03)' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
            }
        }
    }
});
