const contr = require('../seedfiles/controladores')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Controladores').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
