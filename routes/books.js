var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
	// db.findBooksAndAuthors().then(function(data) {
	// 	console.log(data);
	// 	res.render('books', {
	// 		book:data
	// 	})
	// })
	db.findBooks().then(function(data) {
		res.render('books', {
			book: data
		});
	})
});

router.get('/add', function(req, res, next) {
	res.render('addbook')
});

router.post('/add', function(req, res, next) {
	// console.log(req.body);
	db.addBook(req.body).then(function() {
		res.redirect('/books');
	})
});

router.get('/:id', function(req, res, next) {
	db.findBooksByAuthorId(req.params.id).then(function (results) {
		console.log(results);
    res.render('bookdetail', {book:results[0], author:results[1]})
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
  db.getBookById(req.params.id).then(function (book) {
    res.render('editbook', {book:book})
  });
});

router.put('/:id/edit', function(req, res, next) {
  console.log("hitting route!");
  db.editBook(req.params.id, req.body)
    .then(function(){
      res.redirect('/books')
    })
});

module.exports = router;
