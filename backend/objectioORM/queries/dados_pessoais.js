var _ = require("lodash");
var Dados = require("../models/model_dados");
var Titular = require("../models/model_titular");
var DP = require("../models/model_dp_organizacoes");


exports.get_dados = (filters = {}) => {

        return Dados.query();
    
};

exports.get_dado = ({ id_dado }) => {
    // console.log(id_dado)
    return Dados.query()
      .findById(id_dado)
  };


exports.get_titular = ({ id_dado }) => {
  return Titular.query().where({ id_dado })
  };

  exports.get_organizacoes = ({ id_dado }) => {
    return DP.query()
      .joinRelation('organizacao')
      .select('organizacao.*')
      .where({ id_dado })
  };