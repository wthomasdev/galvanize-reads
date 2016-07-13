
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_author', function(table) {
    table.increments();
    table.integer('book_id').references('id').inTable('book').onDelete('cascade');
    table.integer('author_id').references('id').inTable('author').onDelete('cascade');
  }).then(function() {
  return knex.schema.createTable('book', function(table) {
    table.increments();
    table.string('title').unique().notNullable();
    table.string('book_genre').notNullable();
    table.text('book_description').notNullable();
    table.string('book_cover_url');
    table.integer('author').references('id').inTable('book_author').onDelete('cascade');
  });
}).then(function() {
  return knex.schema.createTable('author', function(table) {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('biography').notNullable();
    table.string('author_portrait_url');
    table.integer('book').references('id').inTable('book_author').onDelete('cascade');
  });
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_author').then(function () {
    return knex.schema.dropTableIfExists('book').then(function () {
      return knex.schema.dropTableIfExists('author');
    });
  });
};
