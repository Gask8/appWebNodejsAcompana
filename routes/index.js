var express = require('express');
var router = express.Router();
const Usuario = require("../controllers/usuario.controller.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  var vsession = req.session;res.render('index', { vsession,  title: 'Fundacion Acompaña' });
});

router.get('/login', function(req, res, next) {
  var vsession = req.session;res.render('login', {vsession});
});

router.post('/sign',Usuario.findOne);

router.get('/registro', function(req, res, next) {
  var vsession = req.session;res.render('doliente/form', {vsession});
});

router.get('/gracias', function(req, res, next) {
  var vsession = req.session;res.render('doliente/gracias', {vsession});
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();res.redirect('/');
});

module.exports = router;
