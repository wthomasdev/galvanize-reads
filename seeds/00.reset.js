exports.seed = function(knex, Promise) {
  return knex('book').del().then(function() {
    return knex('author').del()
  })

};
