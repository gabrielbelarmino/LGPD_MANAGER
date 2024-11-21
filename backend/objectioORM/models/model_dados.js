const { Model } = require("objection");

class Dados_Pessoais extends Model {
    static get tableName() {
        return "Dados_Pessoais";
    }

    static get idColumn() {
        return "id_dado";
    }

    static get relationMappings() {
        const DP_Organizacoes = require("./model_dp_organizacoes");
        const Titular_Dados = require("./model_titular");



        return {
            dp_organizacoes: {
                relation: Model.HasManyRelation,
                modelClass: DP_Organizacoes,
                join: {
                    from: "Dados_Pessoais.id_dado",
                    to: "DP_Organizacoes.id_dado",
                },
            },
            titular: {
                relation: Model.HasManyRelation,
                modelClass: Titular_Dados,
                join: {
                    from: "Dados_Pessoais.id_dado",
                    to: "Titular_Dados.id_dado",
                },
            }
        };
    }
}

module.exports = Dados_Pessoais;
