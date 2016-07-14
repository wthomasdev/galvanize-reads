getAllBooks: function() {
  return knex('book')
    .join('genre', 'book.genre_id', '=', 'genre.id')
    .select('book.id as id', 'book.title', 'genre.name as genre', 'book.description', 'book.cover_url');
},
getAuthorsByBookId: function(bookId) {
  return knex('author').select('author.first_name', 'author.last_name', 'author.id as author_id')
    .innerJoin('book_author', 'author.id', 'book_author.author_id')
    .where({
      'book_author.book_id': bookId
    });
},
listBooksWithAuthors: function() {
  return this.getAllBooks()
    .then((returnedBooks) => {
      return returnedBooks.map((book) => {
        return this.getAuthorsByBookId(book.id)
          .then(function(authors) {
            book.authors = authors;
            return book;
          });
      });
    }
  ).then(function (data) {
    return Promise.all(data);
  });
}
