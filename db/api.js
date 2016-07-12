var knex = require('./knex');

module.exports = {
  findBooks: function () {
    return knex('book').select();
  }




};
