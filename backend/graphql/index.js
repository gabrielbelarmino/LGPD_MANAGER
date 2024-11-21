const { gql } = require("apollo-server");

const { titularTypeDef, titularResolver,  } = require("./titulares");
const { dadosTypeDef, dadosResolver, } = require("./dados_pessoais");
const { orgTypeDef, orgResolver} = require("./organizacoes");
const { concentTypeDef, concentResolver } = require("./consentimento");
const { controlTypeDef, controlResolver } = require("./controladores");
const { propTypeDef, propResolver } = require("./propositos");
const { acaoTypeDef, acaoResolver } = require("./acao");


const Query = gql`
  #caso eu precise criar novas queries não relacionadas a nenhum tipo
  type Query {
    _dummy:String   #é necessário pelo menos um
  }
  type Mutation {
    _dummy:String   #é necessário pelo menos um
  }
`;

const resolvers = [dadosResolver, titularResolver, orgResolver, concentResolver, controlResolver, propResolver, acaoResolver ]//
const typeDefs = [Query, dadosTypeDef, titularTypeDef, orgTypeDef, concentTypeDef, controlTypeDef, propTypeDef, acaoTypeDef]//

module.exports = { typeDefs, resolvers };
