var knex = require('./knex');

module.exports = {
  findBooks: function () {
    return knex('book').select();
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
