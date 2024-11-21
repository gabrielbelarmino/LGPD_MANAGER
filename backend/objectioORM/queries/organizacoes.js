var _ = require("lodash");
var DP = require("../models/model_dp_organizacoes");
var Organizacao = require("../models/model_organizacao");


exports.get_organizacoes = (filters = {}) => {

        return Organizacao.query();
    
};


exports.get_organizacao = ({ id_organizacao }) => {
    return Organizacao.query()
      .findById(id_organizacao)
  };


exports.get_dados = ({ id_organizacao }) => {
    return DP.query()
      .joinRelation('dados_pessoais')
      .select('dados_pessoais.*')
      .where({ id_organizacao })
  };

  
  