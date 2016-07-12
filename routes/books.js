var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findBooks().then(function(data) {
    res.render('books', { book:data});

  })
});

module.exports = router;
