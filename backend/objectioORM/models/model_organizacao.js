const { Model } = require("objection");

class Organizacoes extends Model {
    static get tableName() {
        return "Organizacoes";
    }

    static get idColumn() {
        return "id_organizacao";
    }

    static get relationMappings() {
        const Controladores = require("./model_controlador");
        const DP_Organizacoes = require("./model_dp_organizacoes");
        return {
            dp_organizacoes: {
                relation: Model.HasManyRelation,
                modelClass: DP_Organizacoes,
                join: {
                    from: "Organizacoes.id_organizacao",
                    to: "DP_Organizacoes.id_organizacao",
                },
            },
            controladores: {
                relation: Model.HasManyRelation,
                modelClass: Controladores,
                join: {
                    from: "Organizacoes.id_organizacao",
                    to: "Controladores.id_organizacao",
                },
            },
        };
    }
}

module.exports = Organizacoes;
