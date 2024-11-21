const contr = require('../seedfiles/propositos')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Propositos').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
