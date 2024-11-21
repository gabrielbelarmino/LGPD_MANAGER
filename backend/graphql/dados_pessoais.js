const { gql } = require("apollo-server");


const Dados = require('../objectioORM/queries/dados_pessoais');
const Titulares = require('../objectioORM/queries/titulares');


const dadosTypeDef = gql`
  extend type Query {
    dado_pessoal(id_dado: Int!): Dados_Pessoais
    dados_pessoais: [Dados_Pessoais!]
  }


  type Dados_Pessoais {
    id_dado: Int!
    nome: String
    cpf: String
    nome_social: String
    email: String
    genero: String
    opcao_sexual: String
    religiao: String
    celular: String
    renda: String
    segmento_politico: String
    nascimento: String
    estado_civil: String
    titular: [Titular_Dados!]
    organizacoes: [Organizacoes!]

}
`;
const dadosResolver = {
  Query: {
    dado_pessoal: (obj, args, context, info) => {
      return Dados.get_dado(args)
    },
    dados_pessoais: (obj, args, context, info) => {
      return Dados.get_dados(args)
    }},Dados_Pessoais: {
      titular: ( id_dado ) => {
        
        return Titulares.get_titular_by_dado( id_dado )
      }
        ,organizacoes: ({ id_dado }) => {
      
       return Dados.get_organizacoes({ id_dado })
     }
    }
   
};

module.exports = {
    dadosTypeDef,
    dadosResolver
};
