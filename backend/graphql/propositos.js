const { gql } = require("apollo-server");


const Consentimentos = require('../objectioORM/queries/consentimento');
const Propositos = require('../objectioORM/queries/propositos');
const Titulares = require('../objectioORM/queries/titulares');
const Acoes = require('../objectioORM/queries/acao');
const Controladores = require('../objectioORM/queries/controladores');


const propTypeDef = gql`
  extend type Query {
    proposito(id_proposito: Int!): Propositos
    propositos: [Propositos!]
    
  }


  type Propositos {
    id_proposito: Int!
    titulo_proposito: String
    acoes: [Acoes!]
    titular: Titular_Dados
    consentimento: Consentimentos
    controlador: Controladores

}
`;
const propResolver = {
  Query: {
    proposito: (obj, args, context, info) => {
      return Propositos.get_proposito(args)
    },
    propositos: (obj, args, context, info) => {
      return Propositos.get_propositos(args)
    }
    },Propositos: {
      acoes: ( id_proposito ) => {
     
      return Acoes.get_acoes_by_prop( id_proposito )
    }, titular: ({ id_titular }) => {
      
      return Titulares.get_titular({ id_titular })
    }, consentimento: ({ id_consentimento }) => {
      
      return Consentimentos.get_concentimento({ id_consentimento })
    }, controlador: ({ id_controlador }) => {
      
      return Controladores.get_controlador({ id_controlador })
    }
  },
  
};

module.exports = {
    propTypeDef,
    propResolver
};
