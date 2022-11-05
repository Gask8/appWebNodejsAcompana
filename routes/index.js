var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fundacion Acompaña' });
});

router.get('/registro', function(req, res, next) {
  res.render('doliente/form');
});

router.get('/gracias', function(req, res, next) {
  res.render('doliente/gracias');
});

module.exports = router;
