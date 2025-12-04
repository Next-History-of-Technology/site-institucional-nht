var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idCamara", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/dias-sem-vazamento/:idCamara", function (req, res) {
    medidaController.buscarDiasSemVazamentos(req, res);
})

router.get("/tempo-real-todas/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTodas(req, res);
})

router.get("/obter-dados-leituras/:idCamara", function (req, res) {
    medidaController.obterDadosLeituras(req, res);
})
module.exports = router;