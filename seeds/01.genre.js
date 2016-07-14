
exports.seed = function(knex, Promise) {
return knex.raw('TRUNCATE genre RESTART IDENTITY CASCADE').then(function() {
  return knex('genre').del()
    .then(function () {
      return Promise.all([
        knex('genre').insert({
          genre:'javaScript'
        }),
        knex('genre').insert({
          genre:'Python'
        })
      ]);
    });
})
};
