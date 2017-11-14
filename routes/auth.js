var express = require('express')
var router = express.Router()

/*  Auth 2.0 登录策略  */
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

//////////////////////

//登录认证成功之后，用户登录信息传给passport，在服务器端生成序列化 session data
passport.serializeUser(function(user, done) {
  console.log('-----serializeUser-----')
  console.log(user)
  done(null, user)
})
//当用户刷新页面时，会再从服务器中取出 session（也可以之前存在数据库中），解析得到用户信息（登录状态被保存，因此还在）
passport.deserializeUser(function(obj, done) {
  console.log('-----deserializeUser-----')
  console.log(obj)
  done(null, obj)
})

//生成策略实例
passport.use(new GitHubStrategy({
    clientID: '9bff1df425c505218057',
    clientSecret: 'faa73aaf1471cd062fcc64f81c4869d4a480c268',
    callbackURL: "http://localhost:4300/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb){
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null, profile)
  }
))


//github 登录
router.get('/github', 
  passport.authenticate('github')
)
router.get('/github/callback', //第二个参数是认证失败后指定跳转到首页
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res){
    console.log(' authenticate successed...')
    console.log(req.user)
    req.session.user = {
      id: req.user.id,
      username: req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider,
      url: req.user.profileUrl
    }
    res.redirect('/')
  }
)
//注销
router.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/')
})


//////////////////


module.exports = router