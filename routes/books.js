var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
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
})

router.get('/:id', function(req, res, next) {
  db.getBookById(req.params.id).then(function (book) {
    // console.log(book);
    res.render('bookdetail', {book:book})
  });
})

module.exports = router;
