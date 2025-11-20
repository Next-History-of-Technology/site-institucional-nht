var database = require("../database/config");

function buscarCamaraPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM camaraFria a WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, nome) {
  
  var instrucaoSql = `INSERT INTO (nome, fkEmpresa) camaraFria VALUES (${nome}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarCamaraPorEmpresa,
  cadastrar
}
