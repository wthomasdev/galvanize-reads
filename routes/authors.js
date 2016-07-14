var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.listAuthorsWithBooksForMerge().then(function(data) {
		res.render('authors', {
			author: data
		});
	})
});

router.get('/add', function(req, res, next) {
	db.findBooks().then(function(books) {
		res.render('addauthor', {book:books})
	})
});

router.post('/add', function(req, res, next) {
	var author = {
	first_name: req.body.first_name,
	last_name: req.body.last_name,
	biography: req.body.biography,
	author_portrait_url: req.body.author_portrait_url
	}
	var bookId = req.body.book_id
	db.addAuthor(author, bookId)
	.then(function(){
		res.redirect('/authors')
	})
});

router.get('/:id', function(req, res, next) {
	db.findAuthorsByBookId(req.params.id).then(function (results) {
		console.log(results);
    res.render('authordetail', {author:results[0], book:results[1]})
  });
});

router.get('/:id/confirm', function(req, res, next) {
	db.findAuthorsByBookId(req.params.id).then(function (results) {
		console.log(results);
    res.render('deleteauthor', {author:results[0], book:results[1]})
  });
});

router.delete('/:id/delete', function(req, res, next){
  db.deleteAuthorById(req.params.id)
    .then(function(){
      res.redirect('/authors')
    })
});

router.get('/:id/edit', function(req, res, next) {
	return Promise.all([
		db.findBooksByAuthorId(req.params.id),
		db.getAuthorById(req.params.id)
	]).then(function (results) {
    res.render('editauthor', {author:results[1], book:results[0]})
  });
});

router.put('/:id/edit', function(req, res, next) {
  console.log("hitting route!");
  db.editAuthor(req.params.id, req.body)
    .then(function(){
      res.redirect('/authors')
    })
});

module.exports = router;
