var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  res.render('index', { title: 'Express' }); //请求发出，不再传给next
});

module.exports = router;
