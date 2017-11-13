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

router.post('/notes/add', function(req, res, next){
  var note = req.body.note
  Note.create({text: note}).then(function(notes){
    res.send({status: 0, data: {id:notes.dataValues.id}})
  }).catch(function(){
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

router.post('/notes/edit', function(req, res, next){
  Note.update({text: req.body.note}, {where: {id:req.body.id}}).then(function(){
    console.log(arguments)
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

router.post('/notes/delete', function(req, res, next){
  Note.destroy({where: {id:req.body.id}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})




module.exports = router;
