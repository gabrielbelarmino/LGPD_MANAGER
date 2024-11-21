
exports.up = function (knex, Promise) {
    return knex.schema
      .table('Controladores', function (table) {
        table.foreign('id_organizacao').references('id_organizacao').inTable('Organizacoes').onDelete('NO ACTION');
      })
      .table('Titular_Dados', function (table) {
        table.foreign('id_dado').references('id_dado').inTable('Dados_Pessoais').onDelete('NO ACTION');
      })
      .table('Consentimentos', function (table) {
        table.foreign('id_titular').references('id_titular').inTable('Titular_Dados').onDelete('NO ACTION');
      })
      .table('Propositos', function (table) {

        table.foreign('id_controlador').references('id_controlador').inTable('Controladores').onDelete('NO ACTION');
        table.foreign('id_titular').references('id_titular').inTable('Titular_Dados').onDelete('NO ACTION');
        table.foreign('id_consentimento').references('id_consentimento').inTable('Consentimentos').onDelete('NO ACTION');
      })
      .table('Acoes', function (table) {
       
        table.foreign('id_proposito').references('id_proposito').inTable('Propositos').onDelete('NO ACTION');
      })
      .table('DP_Organizacao', function (table) {
        table.foreign('id_organizacao').references('id_organizacao').inTable('Organizacoes').onDelete('NO ACTION');
        table.foreign('id_dado').references('id_dado').inTable('Dados_Pessoais').onDelete('NO ACTION');
      })
  
  };
  
  exports.down = function (knex, Promise) {
    // return knex.raw(`SELECT concat('ALTER TABLE ', TABLE_NAME, ' DROP FOREIGN KEY ', CONSTRAINT_NAME, ';') 
    // FROM information_schema.key_column_usage 
    // WHERE CONSTRAINT_SCHEMA = 'db_name' 
    // AND referenced_table_name IS NOT NULL;`);
    return knex.schema
    .table('Controladores', function (table) {
      table.dropForeign('id_organizacao')
    })
    .table('Titular_Dados', function (table) {
      table.dropForeign('id_dado')
    })
    .table('Consentimentos', function (table) {
      table.dropForeign('id_titular')
    })
    .table('Propositos', function (table) {
        table.dropForeign('id_controlador')
        table.dropForeign('id_titular')
        table.dropForeign('id_consentimento')
    })
    .table('Acoes', function (table) {
        table.dropForeign('id_proposito')
    })
    .table('DP_Organizacao', function (table) {
      table.dropForeign('id_organizacao')
      table.dropForeign('id_dado')
    })
  };
  