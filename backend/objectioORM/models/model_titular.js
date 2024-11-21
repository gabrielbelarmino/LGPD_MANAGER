const { Model } = require("objection");

class Titular_Dados extends Model {
    static get tableName() {
        return "Titular_Dados";
    }

    static get idColumn() {
        return "id_titular";
    }

    static get relationMappings() {
        const Dados_Pessoais = require("./model_dados");
        const Consentimentos = require("./model_consentimento");
        const Propositos = require("./model_proposito");

        return {
            dados_pessoais: {
                relation: Model.BelongsToOneRelation,
                modelClass: Dados_Pessoais,
                join: {
                    from: "Titular_Dados.id_dado",
                    to: "Dados_Pessoais.id_dado",
                },
            },
            consentimentos: {
                relation: Model.HasManyRelation,
                modelClass: Consentimentos,
                join: {
                    from: "Titular_Dados.id_titular",
                    to: "Consentimentos.id_titular",
                },
            },
            propositos: {
                relation: Model.HasManyRelation,
                modelClass: Propositos,
                join: {
                    from: "Titular_Dados.id_titular",
                    to: "Propositos.id_titular",
                },
            }
        };
    }
}

module.exports = Titular_Dados;
