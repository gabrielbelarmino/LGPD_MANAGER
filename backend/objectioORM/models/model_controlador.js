const { Model } = require("objection");

class Controladores extends Model {
    static get tableName() {
        return "Controladores";
    }

    static get idColumn() {
        return "id_controlador";
    }

    static get relationMappings() {
        const Propositos = require("./model_proposito");
        const Organizacoes = require("./model_organizacao");
        return {
            propositos: {
                relation: Model.HasManyRelation,
                modelClass: Propositos,
                join: {
                    from: "Controladores.id_controlador",
                    to: "Proposito.id_controlador",
                },
            },
            organizacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Organizacoes,
                join: {
                    from: "Controladores.id_organizacao",
                    to: "Proposito.id_organizacao",
                },
            },
        };
    }
}

module.exports = Controladores;
