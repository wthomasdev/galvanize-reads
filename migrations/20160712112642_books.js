
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', function(table) {
    table.increments();
    table.string('title').unique().notNullable();
    table.string('book_genre').notNullable();
    table.text('book_description').notNullable();
    table.string('book_cover_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
