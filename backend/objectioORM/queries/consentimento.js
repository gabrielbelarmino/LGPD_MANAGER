var consentimento = require("../models/model_consentimento");
var _ = require("lodash");
var Dados = require("../models/model_dados");
var Titular = require("../models/model_titular");

exports.get_concentimentos = (filters = {}) => {

        return consentimento.query();
    
};

exports.get_concentimento = ({ id_consentimento }) => {
    // console.log(id_dado)
    return consentimento.query()
      .findById(id_consentimento)
  };

  exports.get_concent_by_subject = ({id_titular}) => {
    // console.log(id_proposito)
    return consentimento.query()
        .where(`Consentimentos.id_titular`,id_titular)
};
