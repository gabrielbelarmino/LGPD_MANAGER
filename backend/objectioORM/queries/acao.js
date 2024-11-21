var _ = require("lodash");

var Propositos = require("../models/model_proposito");
var Acoes = require("../models/model_acao");

exports.get_acoes = (filters = {}) => {

        return Acoes.query();
    
};

exports.get_acao = ({ id_acao }) => {
    // console.log(id_dado)
    return Acoes.query()
      .findById(id_acao)
  };

  exports.get_acoes_by_prop = ({id_proposito}) => {
    // console.log(id_proposito)
    return Acoes.query()
        .where(`Acoes.id_proposito`,id_proposito)
};