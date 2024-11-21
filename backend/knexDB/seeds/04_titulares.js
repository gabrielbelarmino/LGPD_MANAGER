const contr = require('../seedfiles/titulares')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Titular_Dados').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
