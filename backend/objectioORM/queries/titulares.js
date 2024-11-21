var _ = require("lodash");
var Titulares = require("../models/model_titular");
var Consentimento = require("../models/model_consentimento");
var Propositos = require("../models/model_proposito");
var Controlador = require("../models/model_controlador");
var DP = require("../models/model_dp_organizacoes");



exports.get_titulares = (filters = {}) => {

        return Titulares.query();
    
};


exports.get_titular = ({ id_titular }) => {
    return Titulares.query()
      .findById(id_titular)
  };

  exports.get_titular_by_dado = ({id_dado}) => {
    // console.log(id_proposito)
      return Titulares.query()
        .where(`Titular_Dados.id_dado`,id_dado)
    
};

exports.consentir = async ({id_titular, id_consentimento}) => {
  
  var id_dado = await Titulares.query()
  .select('id_dado')
  .where({ id_titular })
  .then(e => e[0]);


  const titular = await Consentimento.query()
    .select('id_titular')
    .where({ id_consentimento })
    .then(e => e[0]);
  
  if(titular.id_titular != id_titular){
      return new Error(["Titular Não faz parte deste Consentimento"])
  }

  const consent = await Consentimento.query()
    .update({status_consentimento:'ATIVO'})
    .where({ id_consentimento })
    .then(e => e[0]);
  



  const id_controlador = await Propositos.query()
    .select('id_controlador')
    .where({ id_consentimento })
    .then(e => e[0]);
  


  var id_organizacao = await Controlador.query()
  .select('id_organizacao')
  .where(id_controlador)
  .then(e => e[0]);

  id_organizacao = id_organizacao.id_organizacao
  id_dado = id_dado.id_dado

  await DP.query()
  .insert({id_dado,id_organizacao})
  .then(e => e[0]);

  return await Consentimento.query()
  .findById( id_consentimento )
};

exports.revogar = async ({id_titular, id_consentimento}) => {
  
  var id_dado = await Titulares.query()
  .select('id_dado')
  .where({ id_titular })
  .then(e => e[0]);

 
  const titular = await Consentimento.query()
    .select('id_titular')
    .where({ id_consentimento })
    .then(e => e[0]);
  
  if(titular.id_titular != id_titular){
      return new Error(["Titular Não faz parte deste Consentimento"])
  }

  const consent = await Consentimento.query()
    .update({status_consentimento:'REVOGADO'})
    .where({ id_consentimento })
    .then(e => e[0]);
  


  const id_controlador = await Propositos.query()
    .select('id_controlador')
    .where({ id_consentimento })
    .then(e => e[0]);
  


  var id_organizacao = await Controlador.query()
  .select('id_organizacao')
  .where(id_controlador)
  .then(e => e[0]);

  id_organizacao = id_organizacao.id_organizacao
  id_dado = id_dado.id_dado

  await DP.query()
  .delete().where({id_dado,id_organizacao})
  .then(e => e[0]);

  return await Consentimento.query()
  .findById( id_consentimento )
};