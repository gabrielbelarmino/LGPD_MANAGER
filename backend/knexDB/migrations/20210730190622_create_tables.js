


exports.up = function(knex) {
    return knex.schema
    .createTable('Organizacoes', table => {
        table.integer('id_organizacao').notNullable().primary('id_organizacao');
        table.string('nome_organizacao').notNullable();
        table.string('rs_organizacao').notNullable();
        table.string('tipo_organizacao').notNullable();
        table.unique('id_organizacao');
        // table.unique('id_organizacao');


    })
    .createTable('Dados_Pessoais', table => {
        table.integer('id_dado').notNullable().primary('id_dado');
        table.string('nome')
        table.string('cpf')
        table.string('nome_social');
        table.string('email');
        table.string('genero')
        table.string('opcao_sexual')
        table.string('religiao');
        table.string('celular');
        table.string('renda')
        table.string('segmento_politico')
        table.string('nascimento');
        table.string('estado_civil');
        table.unique('id_dado');
        
    })
    .createTable('Controladores', table => {
        table.integer('id_controlador').notNullable();
        table.string('nome_controlador');
        table.integer('id_organizacao');
     
        table.primary('id_controlador');
        


    })
    .createTable('Titular_Dados', table => {
        table.integer('id_titular').notNullable();
        table.integer('id_dado');
        table.primary('id_titular');
        
    })
    .createTable('Consentimentos', table => {
        table.increments('id_consentimento').notNullable();
        table.string('data_consentimento').notNullable();
        table.string('final_consentimento').notNullable();
        table.string('status_consentimento').notNullable();
        table.integer('id_titular').notNullable();
        // table.unique('id_consentimento');
        // table.primary('id_consentimento');
        
    })
    .createTable('Propositos', table => {
        table.increments('id_proposito').notNullable();
        table.string('titulo_proposito').notNullable();
        table.integer('id_titular').notNullable();
        table.integer('id_consentimento').notNullable();
        table.integer('id_controlador').notNullable();

        // table.primary('id_proposito');
        
    })
    .createTable('Acoes', table => {
        table.increments('id_acao').notNullable();
        table.string('nome_acao').notNullable();
        table.integer('id_proposito');

        // table.primary('id_acao');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('Acoes')
    .dropTable('Propositos')
    .dropTable('Consentimentos')
    .dropTable('Titular_Dados')
    .dropTable('Controladores')
    .dropTable('Dados_Pessoais')
    .dropTable('Organizacoes');

};
