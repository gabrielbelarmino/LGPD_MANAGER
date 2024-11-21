const { Model } = require("objection");

class DP_Organizacoes extends Model {
    static get tableName() {
        return "DP_Organizacao";
    }

    static get idColumn() {
        return ['id_dado','id_organizacao'];
    }

    static get relationMappings() {
        const Dados_Pessoais = require('./model_dados');
    const Organizacoes = require('./model_organizacao');

        return {
            dados_pessoais: {
                relation: Model.BelongsToOneRelation,
                modelClass: Dados_Pessoais,
                join: {
                    from: "DP_Organizacao.id_dado",
                    to: "Dados_Pessoais.id_dado",
                },
            },
            organizacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Organizacoes,
                join: {
                    from: "DP_Organizacao.id_organizacao",
                    to: "Organizacoes.id_organizacao",
                },
            }
        };
    }
}

module.exports = DP_Organizacoes;
