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
  }




};
