const { gql } = require("apollo-server");


const Organizacoes = require('../objectioORM/queries/organizacoes');
const Titulares = require('../objectioORM/queries/titulares');
const Controladores = require('../objectioORM/queries/controladores');
const Dados = require('../objectioORM/queries/dados_pessoais');


const orgTypeDef = gql`
  extend type Query {
    organizacao(id_organizacao: Int!): Organizacoes
    organizacoes: [Organizacoes!]
    
  }


  type Organizacoes {
    id_organizacao: Int!
    rs_organizacao: String
    nome_organizacao: String
    tipo_organizacao: String
    dados_pessoais: [Dados_Pessoais!]
    controladores: [Controladores!]
}
`;
const orgResolver = {
  Query: {
    organizacao: (obj, args, context, info) => {
      return Organizacoes.get_organizacao(args)
    },
    organizacoes: (obj, args, context, info) => {
      return Organizacoes.get_organizacoes(args)
    }
    },Organizacoes: {
      controladores: ( id_organizacao ) => {
     
      return Controladores.get_control_by_org( id_organizacao )
    }, dados_pessoais: ({ id_organizacao }) => {
      
      return Organizacoes.get_dados({ id_organizacao })
    }}
  
};

module.exports = {
    orgTypeDef,
    orgResolver
};
