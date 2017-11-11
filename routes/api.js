var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/*  处理所有 /api 的路由  */

/*
 * 1. 获取所有的 notes： GET: /api/notes   
    req: {}    
    res: {status: 0, data: [{},{}]}  or  {status: 1, errorMsg: '失败的原因'}

2. 创建一个 note： POST: /api/notes/add
    req: {note: 'hellow world'}
    res: {status: 0}  or  {status: 1, errorMsg: '失败的原因'}  

3. 修改一个 note:  POST： /api/notes/edit   
    req: {note: 'new note', id: 666}
    res: {status: 0}  or  {status: 1, errorMsg: '失败的原因'}  

4. 删除一个 note:  POST： /api/notes/delete
    req: {id: 666}
    res: {status: 0}  or  {status: 1, errorMsg: '失败的原因'}
 */


router.get('/notes', function(req, res, next) {
  Note.findAll({raw: true}).then(function(notes){
    res.send({status: 0, data: notes})
  })
});

router.post('/notes/add', function(req, res, nest){
  var note = req.body.note;
  console.log('成功收到 /notes/add 请求', note)
  
  res.send('{status: 0}')
})

router.post('/notes/edit', function(req, res, next){
  console.log('成功收到 /notes/edit 请求')
})

router.post('/notes/delete', function(req, res, next){
  console.log('成功收到 /notes/delete 请求')
})




module.exports = router;
