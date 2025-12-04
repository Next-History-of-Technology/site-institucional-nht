var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosLeituras(idCamara) {

    var instrucaoSql = `SELECT 
    s.idSensor,
    ls.nomeLocal,
    cf.nome AS nomeCamara,
    l.valorPPM,
    l.dataHora AS dataUltimaLeitura

    FROM sensor s
    JOIN localSensor ls ON ls.idLocalSensor = s.fkLocalSensor
    JOIN camaraFria cf ON cf.idCamaraFria = ls.fkCamaraFria
    JOIN empresa e ON e.idEmpresa = cf.fkEmpresa

    JOIN leitura l ON l.idLeitura = (
    SELECT idLeitura
    FROM leitura
    WHERE fkSensor = s.idSensor
    ORDER BY dataHora DESC
)
WHERE cf.idCamaraFria = ${idCamara};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idCamara) {

    var instrucaoSql = `SELECT 
    s.idSensor,
    ls.nomeLocal,
    cf.nome AS nomeCamara,
    l.valorPPM,
    l.dataHora AS dataUltimaLeitura

    FROM sensor s
    JOIN localSensor ls ON ls.idLocalSensor = s.fkLocalSensor
    JOIN camaraFria cf ON cf.idCamaraFria = ls.fkCamaraFria
    JOIN empresa e ON e.idEmpresa = cf.fkEmpresa

    JOIN leitura l ON l.idLeitura = (
    SELECT idLeitura
    FROM leitura
    WHERE fkSensor = s.idSensor
    ORDER BY dataHora DESC
    LIMIT 1
)
WHERE cf.idCamaraFria = ${idCamara};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealTodas(idEmpresa) {

    var instrucaoSql = `SELECT 
    s.idSensor,
    ls.nomeLocal,
    cf.nome AS nomeCamara,
    l.valorPPM,
    l.dataHora AS dataUltimaLeitura

    FROM sensor s
    JOIN localSensor ls ON ls.idLocalSensor = s.fkLocalSensor
    JOIN camaraFria cf ON cf.idCamaraFria = ls.fkCamaraFria
    JOIN empresa e ON e.idEmpresa = cf.fkEmpresa

    JOIN leitura l ON l.idLeitura = (
    SELECT idLeitura
    FROM leitura
    WHERE fkSensor = s.idSensor
    ORDER BY dataHora DESC
    LIMIT 1
)
WHERE e.idEmpresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarDiasSemVazamentos(idCamara) {

    var instrucaoSql = `
SELECT 
    s.idSensor,
    cf.nome AS nomeCamara,

    DATEDIFF(
        NOW(),
        (
            SELECT l2.dataHora
            FROM leitura l2
            WHERE l2.fkSensor = s.idSensor
              AND l2.valorPPM >= 5        
            ORDER BY l2.dataHora DESC
            LIMIT 1
        )
    ) AS diasSemVazamento

FROM sensor s
JOIN localSensor ls ON ls.idLocalSensor = s.fkLocalSensor
JOIN camaraFria cf ON cf.idCamaraFria = ls.fkCamaraFria
WHERE cf.idCamaraFria = ${idCamara};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarDiasSemVazamentos,
    buscarMedidasEmTempoRealTodas,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    obterDadosLeituras
}
