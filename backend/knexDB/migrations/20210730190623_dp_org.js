exports.up = function (knex, Promise) {
    return knex.schema.createTable("DP_Organizacao", table => {
      table.integer("id_organizacao").notNullable();
      table.integer("id_dado").notNullable();

      table.primary([
        "id_dado",
        "id_organizacao"
      ]);
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable("DP_Organizacao");
  };
  