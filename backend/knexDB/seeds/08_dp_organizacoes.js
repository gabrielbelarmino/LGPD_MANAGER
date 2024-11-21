const contr = require('../seedfiles/dp_organizacoes')



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('DP_Organizacao').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw(contr);
    })
};
