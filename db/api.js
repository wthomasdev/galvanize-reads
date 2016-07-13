var knex = require('./knex');

module.exports = {
  findBooks: function () {
    return knex('book').select();
  },
  findBooksAndAuthors: function() {
    return knex('book').select().join('book_author', function() {
      this.on('book.id', '=', 'book_author.book_id')
    })
    .join('author', function() {
      this.on('book_author.author_id', '=', 'author.id')
    })
  },
  findAuthorsByBookId: function (id) {
    return Promise.all([
      knex('author').where('id', id).first(),
      knex('author').where('author.id', id).first()
      .then(function(author){
        return knex('book_author').where({
          author_id: author.id
        }).pluck('book_id')
        }).then(function(ids){
        return knex('book').whereIn('id', ids)
        }).then(function(results){
        return results;
      })
    ]);
  },
   addBook: function (data) {
    return knex('book').insert(data);
  },
  getBookById: function (bookId) {
    return knex('book').select().where({
      id: bookId
    }).first()
  },
  deleteBookById: function(bookId) {
    return knex('book').del().where({
      id: bookId
    })
  },
  editBook: function(bookId, edit) {
    return knex('book').update(edit).where({
      id: bookId
    })
  },
  findAuthors: function () {
    return knex('author').select();
  },
  findBooksByAuthorId: function (id) {
    return Promise.all([
      knex('book').where('id', id).first(),
      knex('book').where('book.id', id).first()
      .then(function(book){
        return knex('book_author').where({
          book_id: book.id
        }).pluck('author_id')
        }).then(function(ids){
        return knex('author').whereIn('id', ids)
        }).then(function(results){
        return results;
      })
    ]);
  },
  addAuthor: function (data) {
    return knex('author').insert(data);
  },
  deleteAuthorById: function(authorId) {
    return knex('author').del().where({
      id: authorId
    })
  },
  getAuthorById: function (authorId) {
    return knex('author').select().where({
      id: authorId
    }).first()
  },
  deleteAuthorById: function(authorId) {
    return knex('author').del().where({
      id: authorId
    })
  },
  editBook: function(authorId, edit) {
    return knex('author').update(edit).where({
      id: authorId
    })
  }


};
