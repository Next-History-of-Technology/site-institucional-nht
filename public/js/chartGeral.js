
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
