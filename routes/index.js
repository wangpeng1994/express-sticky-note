var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  res.render('index', { title: 'Express' }); //用模板引擎渲染，发给前端
});

module.exports = router;
