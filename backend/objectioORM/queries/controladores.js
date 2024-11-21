var _ = require("lodash");
var Controlador = require("../models/model_controlador");
var Titulares = require("../models/model_titular");
var Consentimento = require("../models/model_consentimento");
var Proposito = require("../models/model_proposito");
var Acao = require("../models/model_acao");
var DP = require("../models/model_dp_organizacoes");



exports.get_controladores = (filters = {}) => {

        return Controlador.query();
    
};

exports.get_controlador = ({ id_controlador }) => {
    // console.log(id_dado)
    return Controlador.query()
      .findById(id_controlador)
  };

  exports.get_control_by_org= ({id_organizacao}) => {
    // console.log(id_proposito)
    return Controlador.query()
        .where(`Controladores.id_organizacao`,id_organizacao)
  };

  exports.transferir_dados = async ({id_organizacao, id_consentimento}) => {
  
    // var id_dado = await Titulares.query()
    // .select('id_dado')
    // .where({ id_titular })
    // .then(e => e[0]);
  
  
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


  exports.criar_consentimento = async ({id_titular, titulo_proposito,id_controlador},data) => {

    console.log("1:"+id_titular)
    console.log("1:"+titulo_proposito)
    console.log("1:"+id_controlador)
    console.log(data.acoes.length)

    // return null
    const data_1 = {
      
      status_consentimento: 'NÃO CONSENTIDO', 
      final_consentimento: 'null',
      data_consentimento: '2022-06-22 00:00:00',
      id_titular,
    };
    const consent = await Consentimento.query()
      .insert(data_1)
      .returning('*');
    
    const data_2 = { 
      
        id_consentimento: consent.id_consentimento, 
        id_titular,
        titulo_proposito,
        id_controlador
      };  
    const prop = await Proposito.query()
      .insert(data_2)
      .returning('*');  

      console.log(data.length)
    for (i = 0; i < data.acoes.length; ++i) {
      var data_acao = { 
        nome_acao : data.acoes[i],
        id_proposito: prop.id_proposito
      };  
        
        await Acao.query().insert(data_acao).returning('*'); 
      }

      return consent;

  };


  exports.tranferencia_organizacao = async ({id_organizacao, id_consentimento}) => {
  

    const titular = await Consentimento.query()
      .select()
      .where({ id_consentimento })
      .then(e => e[0]);

    if(titular.status_consentimento != 'ATIVO'){
      return new Error(["Consentimento Não Está Ativo"])
    }

    var id_dado = await Titulares.query()
    .select('id_dado')
    .where({ id_titular:titular.id_titular })
    .then(e => e[0]);
  
    id_dado = id_dado.id_dado
  
    await DP.query()
    .insert({id_dado,id_organizacao})
    .then(e => e[0]);
  
    return await Consentimento.query()
    .findById( id_consentimento )
  };