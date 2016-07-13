var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.findAuthors().then(function(data) {
		res.render('authors', {
			author: data
		});
	})
});

router.get('/add', function(req, res, next) {
	res.render('addauthor')
});

router.post('/add', function(req, res, next) {
	// console.log(req.body);
	db.addAuthor(req.body).then(function() {
		res.redirect('/authors');
	})
});

router.get('/:id', function(req, res, next) {
	return Promise.all([
		db.getAuthorById(req.params.id),
		db.findBooksByAuthorId(req.params.id)
	]).then(function (data) {
    res.render('authordetail', {author:data[0], book:data[1]})
  });
});

router.get('/:id/confirm', function(req, res, next) {
  db.getAuthorById(req.params.id).then(function (author) {
    res.render('deleteauthor', {author:author})
  });
});

router.delete('/:id/delete', function(req, res, next){
  db.deleteAuthorById(req.params.id)
    .then(function(){
      res.redirect('/authors')
    })
});

router.get('/:id/edit', function(req, res, next) {
  db.getAuthorById(req.params.id).then(function (author) {
    res.render('editauthor', {author:author})
  });
});

router.put('/:id/edit', function(req, res, next) {
  console.log("hitting route!");
  db.editBook(req.params.id, req.body)
    .then(function(){
      res.redirect('/authors')
    })
});

module.exports = router;
