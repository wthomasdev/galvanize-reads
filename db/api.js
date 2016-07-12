var knex = require('./knex');

module.exports = {
  findBooks: function () {
    return knex('book').select();
  },
  addBook: function (data) {
    return knex('book').insert(data);
  }




};
