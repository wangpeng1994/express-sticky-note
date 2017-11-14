var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next){
  var loginData
  if(req.session.user){
    loginData = {
      isLogin: true,
      user: {
        avatar: req.session.user.avatar,
        username: req.session.user.username,
        url: req.session.user.url
      }
    }
  }else{
    loginData = {
      isLogin: false
    }
  }

  res.render('index', loginData) //用 index.ejs 模板引擎渲染，发给前端
})

module.exports = router