const dp = require('../seedfiles/dados')



exports.seed = async  function (knex, Promise) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "Dados_Pessoais" CASCADE;');
  await knex.raw('TRUNCATE TABLE "Titular_Dados" CASCADE;');
  await knex.raw('TRUNCATE TABLE "Propositos" CASCADE;');
  await knex.raw('TRUNCATE TABLE "Titular_Dados" CASCADE;');
  await knex.raw('TRUNCATE TABLE "Acoes" CASCADE;');
  await knex.raw('TRUNCATE TABLE "DP_Organizacao" CASCADE;');
  return knex('Dados_Pessoais').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(dp);
    })
};
