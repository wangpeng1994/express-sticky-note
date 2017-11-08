var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/abc', function(req, res, next) {
  res.send('我是你要的 abc 资料');
});

module.exports = router;
