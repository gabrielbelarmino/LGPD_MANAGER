const { gql } = require("apollo-server");


const Acoes = require('../objectioORM/queries/acao');
const Propositos = require('../objectioORM/queries/propositos');

const acaoTypeDef = gql`
  extend type Query {
    acao(id_acao: Int!): Acoes
    acoes: [Acoes!]
    
  }

  type Acoes {
    id_acao: Int!
    nome_acao: String
    proposito: Propositos!
}
`;
const acaoResolver = {
  Query: {
    acao: (obj, args, context, info) => {
      return Acoes.get_acao(args)
    },
    acoes: (obj, args, context, info) => {
      return Acoes.get_acoes(args)
    }
    },Acoes: {
        proposito: ({ id_proposito }) => {
        
        return Propositos.get_proposito({ id_proposito })
      }
    }
};

module.exports = {
    acaoTypeDef,
    acaoResolver
};
