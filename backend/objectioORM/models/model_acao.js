const { Model } = require("objection");

class Acoes extends Model {
    static get tableName() {
        return "Acoes";
    }

    static get idColumn() {
        return "id_acao";
    }

    static get relationMappings() {
        const Propositos = require("./model_proposito");

        return {
            proposito: {
                relation: Model.BelongsToOneRelation,
                modelClass: Propositos,
                join: {
                    from: "Acoes.id_proposito",
                    to: "Propositos.id_proposito",
                },
            },
        };
    }
}

module.exports = Acoes;
