var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query) //得到请求参数
  res.render('index', { title: '我的note' }); //用 index.ejs 模板引擎渲染，发给前端
});

module.exports = router;
