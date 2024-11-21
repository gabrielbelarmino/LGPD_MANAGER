const { gql } = require("apollo-server");

const Propositos = require('../objectioORM/queries/propositos');
const Organizacoes = require('../objectioORM/queries/organizacoes');
const Controladores = require('../objectioORM/queries/controladores');
const Titulares = require('../objectioORM/queries/titulares');


const controlTypeDef = gql`
  extend type Query {
    controlador(id_controlador: Int!): Controladores
    controladores: [Controladores!]
    
  }

  extend type Mutation {
    criar_consentimento(input: criar_consentimento_input): Consentimentos
    tranferencia_organizacao(input: transferencia_input): Consentimentos
  }

  input criar_consentimento_input{
  
    id_titular: Int!
    titulo_proposito: String!
    id_controlador: Int!
    acoes: [String]!
    
  }

  input transferencia_input{
  
  id_organizacao: Int!
  id_consentimento: Int!
  
}

  type Controladores {
    id_controlador: Int!
    nome_controlador: String!
    organizacao: Organizacoes! #Organizacoes
    propositos: [Propositos!]#proposito
}
`;
const controlResolver = {
  Query: {
    controlador: (obj, args, context, info) => {
      return Controladores.get_controlador(args)
    },
    controladores: (obj, args, context, info) => {
      return Controladores.get_controladores(args)
    }}, Mutation: {
      criar_consentimento: (obj, { input }, context, info) => {
        const { id_titular, titulo_proposito,id_controlador, ...data } = input;
        return Controladores.criar_consentimento({id_titular, titulo_proposito,id_controlador},data);
      },
      tranferencia_organizacao: (obj, { input }, context, info) => {
        
          return Controladores.tranferencia_organizacao(input);
        }
    
    }
      ,Controladores: {

      propositos: ( id_controlador ) => {
    
      return Propositos.get_prop_by_control( id_controlador )
    }, organizacao: ({ id_organizacao }) => {
      
      return Organizacoes.get_organizacao({ id_organizacao })
    }}
  
};

module.exports = {
    controlTypeDef,
    controlResolver
};
