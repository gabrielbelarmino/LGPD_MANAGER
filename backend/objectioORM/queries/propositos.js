var _ = require("lodash");
var Controlador = require("../models/model_controlador");
var Titular = require("../models/model_titular");
var Propositos = require("../models/model_proposito");

exports.get_propositos = (filters = {}) => {

        return Propositos.query();
    
};

exports.get_proposito = ({ id_proposito }) => {
    // console.log(id_dado)
    return Propositos.query()
      .findById(id_proposito)
  };

  exports.get_prop_by_concent = ({id_consentimento}) => {
    // console.log(id_proposito)
    return Propositos.query()
        .where(`Propositos.id_consentimento`,id_consentimento)
};

exports.get_prop_by_subject = ({id_titular}) => {
  // console.log(id_proposito)
  return Propositos.query()
      .where(`Propositos.id_titular`,id_titular)
};

exports.get_prop_by_control = ({id_controlador}) => {
  // console.log(id_proposito)
  return Propositos.query()
      .where(`Propositos.id_controlador`,id_controlador)
};