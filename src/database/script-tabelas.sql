DROP DATABASE IF EXISTS nh3;
CREATE DATABASE nh3;
USE nh3;

CREATE TABLE plano (
    idPlano INT AUTO_INCREMENT PRIMARY KEY,
    dtVencimentoPlano DATE NOT NULL,
    valorPlano DECIMAL(10,2) NOT NULL,
    tipoPlano VARCHAR(15) NOT NULL,
    CONSTRAINT chkTipoPlano CHECK (tipoPlano IN ('semestral','anual')),
    formaPagamento VARCHAR(30) NOT NULL,
    CONSTRAINT chkFormaPagamento CHECK (formaPagamento IN ('boleto', 'credito', 'pix', 'transferencia')),
    dtPagamento DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO plano VALUES
(default, '2025-11-14', '75.000', 'semestral', 'boleto', default);


CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ CHAR(14) NOT NULL UNIQUE,
    nomeFantasia VARCHAR(60),
    razaoSocial VARCHAR(80),
    telefone VARCHAR(14),
    statusEmpresa TINYINT DEFAULT 1,
    codigoEmpresa CHAR(5) NOT NULL UNIQUE
);

INSERT INTO empresa VALUES
(default, '20420001461278', 'JBS', 'JBS Ltda', '11 987654532', default, '12345'),
(default, '11222333444455', 'Seara', 'Seara Alimentos SA', '11 999988777', default, 'SEAR1'),
(default, '99887766554433', 'Friboi', 'Friboi Carnes LTDA', '11 988776655', default, 'FRIB1');

CREATE TABLE cadastroFuncionario (
    idFuncionario INT AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    CONSTRAINT chkfkEmpresaFuncionario FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT pkCompostaFuncionarioEmpresa PRIMARY KEY(idFuncionario, fkEmpresa),
    email VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(60) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    telefone CHAR(15) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    statusFuncionario TINYINT DEFAULT 1,
    tipo VARCHAR(45) NOT NULL
);

INSERT INTO cadastroFuncionario VALUES
(1, 1, 'suporte@gmail.com', 'Amanda', 'suporte123', '11 965432524', '09854327689', default, 'suporte');

CREATE TABLE empresa_plano (
    idEmpresaPlano INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    fkPlano INT,
    dataAdesao DATE,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkPlano) REFERENCES plano(idPlano)
);

INSERT INTO empresa_plano VALUES
(default, 1, 1, '2024-12-01'),
(default, 2, 1, '2024-12-02');

ALTER TABLE cadastroFuncionario 
ADD CONSTRAINT chkTipo CHECK(tipo IN ('suporte', 'funcionario'));

CREATE TABLE camaraFria (
    idCamaraFria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    status TINYINT DEFAULT 1,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO camaraFria VALUES 
(default, 'Câmara Bovinos', default, 1),
(default, 'Câmara Suínos', default, 1);

CREATE TABLE localSensor (
    idLocalSensor INT PRIMARY KEY AUTO_INCREMENT,
    nomeLocal VARCHAR(45) NOT NULL,
    statusSensor TINYINT DEFAULT 1,
    fkCamaraFria INT NOT NULL,
    CONSTRAINT chkfkLocalCamaraFria FOREIGN KEY (fkCamaraFria) REFERENCES camaraFria(idCamaraFria),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- CÂMARA 1
INSERT INTO localSensor VALUES 
(default, 'evaporador', default, 1, 1),
(default, 'compressor', default, 1, 1),
(default, 'condensador', default, 1, 1),
(default, 'válvula de expansão', default, 1, 1);

-- CÂMARA 2
INSERT INTO localSensor VALUES 
(default, 'evaporador', default, 2, 1),
(default, 'compressor', default, 2, 1),
(default, 'condensador', default, 2, 1),
(default, 'válvula de expansão', default, 2, 1);


CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    codSerie INT,
    dtInstalacao DATE,
    fklocalSensor INT,
    CONSTRAINT fkLocalSensorEmpresa FOREIGN KEY (fklocalSensor) REFERENCES localSensor(idLocalSensor)
);

-- Sensores da CÂMARA 1
INSERT INTO sensor VALUES 
(default, 100001, '2025-11-14', 1),
(default, 100002, '2025-11-14', 2),
(default, 100003, '2025-11-14', 3),
(default, 100004, '2025-11-14', 4);

-- Sensores da CÂMARA 2
INSERT INTO sensor VALUES 
(default, 200001, '2025-11-14', 5),
(default, 200002, '2025-11-14', 6),
(default, 200003, '2025-11-14', 7),
(default, 200004, '2025-11-14', 8);


CREATE TABLE leitura (
    idLeitura INT AUTO_INCREMENT,
    fkSensor INT NOT NULL,
    CONSTRAINT fkSensorLeitura FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT pkCompostaLeituraSensor PRIMARY KEY(idLeitura, fkSensor),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    valorPPM DECIMAL(5,2)
);

-- Leituras iniciais
INSERT INTO leitura VALUES
(default, 1, '2025-11-25 09:00:00', 10),
(default, 2, '2025-11-25 09:05:00', 10),
(default, 3, '2025-11-25 09:10:00', 8), 
(default, 4, '2025-11-25 09:15:00', 14),
(default, 5, '2025-11-25 09:20:00', 6),
(default, 6, '2025-11-25 09:25:00', 3),
(default, 7, '2025-11-25 09:30:00', 4),
(default, 8, '2025-11-25 09:35:00', 9);

-- Leituras intermediárias
INSERT INTO leitura VALUES
(default, 1, '2025-11-28 14:00:00', 1),
(default, 2, '2025-11-28 14:05:00', 7),
(default, 3, '2025-11-28 14:10:00', 2),
(default, 4, '2025-11-28 14:15:00', 10),
(default, 5, '2025-11-28 14:20:00', 1),
(default, 6, '2025-11-28 14:25:00', 5),
(default, 7, '2025-11-28 14:30:00', 3),
(default, 8, '2025-11-28 14:35:00', 11);

-- Leituras recentes
INSERT INTO leitura VALUES
(default, 1, '2025-12-04 13:00:00', 4), 
(default, 2, '2025-12-04 13:05:00', 2), 
(default, 3, '2025-12-04 13:10:00', 1), 
(default, 4, '2025-12-04 13:15:00', 3),

(default, 5, '2025-12-04 13:20:00', 4), 
(default, 6, '2025-12-04 13:25:00', 4), 
(default, 7, '2025-12-04 13:30:00', 1), 
(default, 8, '2025-12-04 13:35:00', 3);


CREATE VIEW vw_todos_sensore_camara_especifica AS
SELECT 
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
WHERE cf.idCamaraFria = 1;



CREATE VIEW vw_dias_sem_vazamentos AS
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
WHERE cf.idCamaraFria = 1;


SELECT * FROM vw_todos_sensore_camara_especifica;

SELECT * FROM vw_dias_sem_vazamentos;
