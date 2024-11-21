const { gql } = require("apollo-server");

const Titulares = require('../objectioORM/queries/titulares');
const Dados = require('../objectioORM/queries/dados_pessoais');
const Propositos = require('../objectioORM/queries/propositos');
const Consentimentos = require('../objectioORM/queries/consentimento');


const titularTypeDef = gql`
  extend type Query {
    titular(id_titular: Int!): Titular_Dados
    titulares: [Titular_Dados!]
  }

  extend type Mutation {
    consentir(input: consentimentoInput): Consentimentos
    revogar_consentimento(input: revogarInput): Consentimentos
  }

  input consentimentoInput{
    id_titular: Int!
    id_consentimento: Int!
  }

  input revogarInput{
    id_titular: Int!
    id_consentimento: Int!
  }

  type Titular_Dados {
    id_titular: Int!
    dados_pessoais: Dados_Pessoais!
    consentimento: [Consentimentos!]
    proposito: [Propositos!]
}
`;
const titularResolver = {
  Query: {
    titulares: (obj, args, context, info) => {
      return Titulares.get_titulares(args)
    },
    titular: (obj, args, context, info) => {
      return Titulares.get_titular(args)
    }
  }, Mutation: {
    consentir: (obj, { input }, context, info) => {

      return Titulares.consentir(input);
    },revogar_consentimento: (obj, { input }, context, info) => {

      return Titulares.revogar(input);
    }
  },Titular_Dados: {
    dados_pessoais: ({ id_dado }) => {
      return Dados.get_dado({ id_dado })
    },
    consentimento: ( id_titular ) => {
    
    return Consentimentos.get_concent_by_subject( id_titular )
  },
  proposito: ( id_titular ) => {
  
  return Propositos.get_prop_by_subject( id_titular )
}}
};

module.exports = {
  titularTypeDef,
  titularResolver
};
