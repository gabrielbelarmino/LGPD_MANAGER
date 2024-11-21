const contr = require('../seedfiles/consentimentos')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Consentimentos').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
