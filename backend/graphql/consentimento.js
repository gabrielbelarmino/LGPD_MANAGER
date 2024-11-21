const { gql } = require("apollo-server");


const Consentimentos = require('../objectioORM/queries/consentimento');
const Titulares = require('../objectioORM/queries/titulares');
const Propositos = require('../objectioORM/queries/propositos');


const concentTypeDef = gql`
  extend type Query {
    consentimento(id_consentimento: Int!): Consentimentos
    consentimentos: [Consentimentos!]
    
  }


  type Consentimentos {
    id_consentimento: Int!
    data_consentimento: String
    final_consentimento: String
    status_consentimento: String
    titular: Titular_Dados
    proposito: [Propositos!] 
}
`;
const concentResolver = {
  Query: {
    consentimento: (obj, args, context, info) => {
      return Consentimentos.get_concentimento(args)
    },
    consentimentos: (obj, args, context, info) => {
      return Consentimentos.get_concentimentos(args)
    }

  },Consentimentos: {
    proposito: ( id_consentimento ) => {
    
    return Propositos.get_prop_by_concent( id_consentimento )
  }, titular: ({ id_titular }) => {
    
    return Titulares.get_titular({ id_titular })
  }}
  
};

module.exports = {
    concentTypeDef,
    concentResolver
};
