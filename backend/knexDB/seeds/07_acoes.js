const contr = require('../seedfiles/acoes')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Acoes').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
