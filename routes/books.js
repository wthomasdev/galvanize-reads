var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.listBooksWithAuthorsForMerge().then(function(data) {
		console.log(data);
		res.render('books', {
			book: data
	});
});
});

router.get('/add', function(req, res, next) {
	return Promise.all([
		db.getGenre(),
		db.findAuthors()

	]).then(function(results) {
		console.log(results);
		res.render('addbook', {author:results[1], genre:results[0]})
	});

});

router.post('/add', function(req, res, next) {
	console.log(req.body);
	var book = {
	title: req.body.title,
	book_genre: req.body.book_genre,
	book_description: req.body.book_description,
	book_cover_url: req.body.book_cover_url
}
var authorId = req.body.author_id
db.addBook(book, authorId)
	.then(function(){
		res.redirect('/books')
	})
});

router.get('/:id', function(req, res, next) {
	return Promise.all([
		db.getBookGenreById(req.params.id),
		db.findBooksByAuthorId(req.params.id)
	]).then(function (results) {
		console.log(results[1][1])
    res.render('bookdetail', {book:results[0], author:results[1][1]})
  });
});

router.get('/:id/confirm', function(req, res, next) {
  db.findBooksByAuthorId(req.params.id).then(function (results) {
    res.render('deleteconfirmation', {book:results[0], author:results[1]})
  });
});

router.delete('/:id/delete', function(req, res, next){
  db.deleteBookById(req.params.id)
    .then(function(){
      res.redirect('/books')
    })
});

router.get('/:id/edit', function(req, res, next) {
	return Promise.all([
		db.getBookGenreById(req.params.id),
		db.findAuthors(),
		db.getGenre()
	]).then(function (results) {
    res.render('editbook', {book:results[0], author:results[1], genre:results[2]});
	});
});

router.put('/:id/edit', function(req, res, next) {
	var book = {
	title: req.body.title,
	book_genre: req.body.book_genre,
	book_description: req.body.book_description,
	book_cover_url: req.body.book_cover_url
}
var authorId = req.body.author_id
  db.editBook(req.params.id,book, authorId)
    .then(function(){
      res.redirect('/books')
    })
});

module.exports = router;
