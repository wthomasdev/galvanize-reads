
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE book_author RESTART IDENTITY CASCADE').then(function() {
    return Promise.all([

          knex('book_author').insert(
            {
              author_id:1,
              book_id:1
          }),
          knex('book_author').insert(
            {
              author_id:2,
              book_id:1
          }),
          knex('book_author').insert(
            {
              author_id:3,
              book_id:1
          }),
          knex('book_author').insert(
            {
              author_id:4,
              book_id:2
          }),
          knex('book_author').insert(
            {
              author_id:5,
              book_id:3
          }),
          knex('book_author').insert(
            {
              author_id: 6,
              book_id: 4
          }),
          knex('book_author').insert(
            {
              author_id:6,
              book_id:5
          }),
          knex('book_author').insert(
            {
              author_id:6,
              book_id:6
          }),
      ]);
    });
};
