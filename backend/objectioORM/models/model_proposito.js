const { Model } = require("objection");

class Propositos extends Model {
    static get tableName() {
        return "Propositos";
    }

    static get idColumn() {
        return "id_proposito";
    }


    static get relationMappings() {
        const Titular_Dados = require("./model_titular");
        const Controladores = require("./model_controlador");
        const Consentimentos = require("./model_consentimento");
        const Acao = require("./model_acao");

        return {
            titular: {
                relation: Model.BelongsToOneRelation,
                modelClass: Titular_Dados,
                join: {
                    from: "Propositos.id_titular",
                    to: "Titular_Dados.id_titular",
                },
            },
            controlador: {
                relation: Model.BelongsToOneRelation,
                modelClass: Controladores,
                join: {
                    from: "Propositos.id_controlador",
                    to: "Controladores.id_controlador",
                },
            },
            consentimento: {
                relation: Model.BelongsToOneRelation,
                modelClass: Consentimentos,
                join: {
                    from: "Propositos.id_consentimento",
                    to: "Consentimentos.id_consentimento",
                },
            },acoes: {
                relation: Model.HasManyRelation,
                modelClass: Acao,
                join: {
                    from: "Propositos.id_proposito",
                    to: "Acoes.id_proposito",
                },
            }
        };
    }
}

module.exports = Propositos;
