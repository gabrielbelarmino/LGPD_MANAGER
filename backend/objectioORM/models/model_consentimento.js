const { Model } = require("objection");

class Consentimentos extends Model {
    static get tableName() {
        return "Consentimentos";
    }

    static get idColumn() {
        return "id_consentimento";
    }

    static get relationMappings() {
        const Propositos = require("./model_proposito");
        const Titular_Dados = require("./model_titular");


        return {
            propositos: {
                relation: Model.HasManyRelation,
                modelClass: Propositos,
                join: {
                    from: "Consentimentos.id_consentimento",
                    to: "Propositos.id_consentimento",
                },
            },
            titular: {
                relation: Model.BelongsToOneRelation,
                modelClass: Titular_Dados,
                join: {
                    from: "Consentimentos.id_titular",
                    to: "Titular_Dados.id_titular",
                },
            }
        };
    }
}

module.exports = Consentimentos;
