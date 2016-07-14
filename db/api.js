var knex = require('./knex');

module.exports = {
  findBooks: function () {
    return knex('book').select().join('genre', function() {
      this.on('book.book_genre', '=', 'genre.id')
    });
  },
  getGenre: function () {
    return knex('genre').select()
  },
  getBookGenreById: function(bookId) {
    return knex('book')
      .select()
      .join('genre', function () {
        this.on('book.book_genre', '=', 'genre.id')
      })
      .where('book.id', '=', bookId)
      .first()
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
   addBook: function (body, authorId) {
    return knex('book').insert(body, 'id')
    .then(function(id) {
      return knex('book_author').insert({
        author_id: authorId,
        book_id:id[0]
      })
    })
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
  editBook: function(bookId, book, authorId) {
    return knex('book').update(book, 'id').where({
      id: bookId
    }).then(function() {
      return knex('book_author').insert({
        author_id: authorId,
        book_id:bookId
      })
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
  addAuthor: function (body, bookId) {
    return knex('author').insert(body, 'id')
    .then(function(id) {
      return knex('book_author').insert({
        book_id: bookId,
        author_id:id[0]
      })
    })
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
  editAuthor: function(authorId, edit) {
    return knex('author').update(edit).where({
      id: authorId
    })
  },
  getAllBooksForMerge: function() {
    return knex('book')
      .join('genre', 'book.book_genre', '=', 'genre.id')
      .select('book.id as id', 'book.title', 'genre', 'book.book_description', 'book_cover_url');
  },
  getAuthorsForMerge: function(bookId) {
    return knex('author').select('author.first_name', 'author.last_name', 'author.id as author_id')
      .innerJoin('book_author', 'author.id', 'book_author.author_id')
      .where({
        'book_author.book_id': bookId
      });
  },
  listBooksWithAuthorsForMerge: function() {
    return this.getAllBooksForMerge()
      .then((returnedBooks) => {
        return returnedBooks.map((book) => {
          return this.getAuthorsForMerge(book.id)
            .then(function(authors) {
              book.authors = authors;
              return book;
            });
        });
      }
    ).then(function (data) {
      return Promise.all(data);
    });
  },
  getAllAuthorsForMerge: function() {
		return knex('author').select().orderBy('first_name', 'ASC');
	},
  getBooksByAuthorIdForMerge: function (authorId) {
    return knex('book').select('book.title', 'book.id as book_id')
			.innerJoin('book_author', 'book.id', 'book_author.book_id')
			.where({
				'book_author.author_id': authorId
			});
  },
  listAuthorsWithBooksForMerge: function() {
    return this.getAllAuthorsForMerge()
			.then((returnedAuthors) => {
				return returnedAuthors.map((author) => {
					return this.getBooksByAuthorIdForMerge(author.id)
						.then(function(books) {
              author.books = books;
              return author;
						});
				});
			}
    ).then(function (data) {
	    return Promise.all(data);
	  });
	},
};
