const org = require('../seedfiles/organizacoes')



exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "Organizacoes" CASCADE;');

  return knex('Organizacoes').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(org);
    })
};
