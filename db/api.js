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
  findAuthorsByBookId: function (bookId) {
    return knex('author').select().join('book_author', function() {
      this.on('author.id', '=', 'book_author.author_id')

    }).join('book', function () {
      this.on('book_author.book_id', '=', 'book.id')
    }).where({
      book_id: bookId
    });
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
  findBooksByAuthorId: function (authorId) {
    return knex('book').select().join('book_author', function() {
      this.on('book.id', '=', 'book_author.book_id')

    }).join('author', function () {
      this.on('book_author.author_id', '=', 'author.id')
    }).where({
      author_id: authorId
    });
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
