exports.seed = function(knex, Promise) {
  return knex('book').del()

};
