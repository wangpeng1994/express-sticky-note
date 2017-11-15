var Sequelize = require('sequelize');
var path = require('path')
var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});

/* 仅供测试，测完可删
sequelize.authenticate()
  .then(function(){
    console.log('Connection has been established successfully.');
  })
  .catch(function(err){
    console.error('Unable to connect to the database:', err);
  });
*/

//1. 定义表结构   1    hello    create time     update time
const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },  //增加uid 设置用户权识别
  uid: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
})

Note.sync()
//Note.drop()  // 会先 创建，然后 drop
//Note.sync({force: true})
//Note.create({text: 'hello world'})

// Note.findAll({raw: true}).then(function(notes){
//   console.log(notes)
// })
/*
//2. 检测数据库是否存在当前表结构，不存在则创建，存在则什么都不做
Note.sync().then(function(){
  return Note.create({text: 'hello world'})  //3. 接着创建一条数据
}).then(function(){   //4. 查询数据
  Note.findAll({raw: true}).then(function(notes){
    console.log(notes)
  })
})
*/





//已经创建Note表结构，下面可以正式增删改查了



// Note.drop() 删除此表
// Note.sync({force: true}) 检查是否有此表，有则删除原来的，重新创建，无则直接创建
// Note.create({text: '666'}) 创建 text: 666
// Note.destroy({where: {text:666}}) 删除 text: 666
// Note.findAll({raw: true})  查询
//   .then(function(notes){
//   console.log(notes)
// })
// Note.update() 更新


module.exports = Note;
