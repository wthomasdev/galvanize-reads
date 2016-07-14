let find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('book').select(),
    knex('author').select()
  ]).then(function(result) {
    let book = result[0];
    let author = result[1];
    return Promise.all([

          knex('book_author').insert(
            {
              author_id:find.findFromList('Alex', author, 'first_name'),
              book_id:find.findFromList('Python In a Nutshell', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Anna', author, 'first_name'),
              book_id:find.findFromList('Python In a Nutshell', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Steve', author, 'first_name'),
              book_id:find.findFromList('Python In a Nutshell', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Allen', author, 'first_name'),
              book_id:find.findFromList('Think Python', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Bonnie', author, 'first_name'),
              book_id:find.findFromList('Learning React Native', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Kyle', author, 'first_name'),
              book_id:find.findFromList('You Don\'t Know JS: ES6 & Beyond', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Kyle', author, 'first_name'),
              book_id:find.findFromList('You Don\'t Know JS: Scope & Closures', book, 'title')
          }),
          knex('book_author').insert(
            {
              author_id:find.findFromList('Kyle', author, 'first_name'),
              book_id:find.findFromList('You Don\'t Know JS: Async & Performance', book, 'title')
          }),
      ]);
});
};
