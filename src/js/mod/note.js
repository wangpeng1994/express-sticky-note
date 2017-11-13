require('less/note.less')

var Event = require('mod/event.js')

/*
定义 note形式, id用来识别note
{id: 1, context:'my note'}
*/


function Note(opts){
  this.initOpts(opts)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {

  colors: [
    ['#EA9B35','#EFB04E'], //顶部颜色, 内容颜色
    ['#FF9999','#FFCCCC'],
    ['#A76F00','#CC9966'],
    ['#9999CC','#CCCCFF'],
    ['#ADAD37','#CCCC99'],
    ['#FF9900','#FFCC00'],
    ['#0099CC','#99CCFF'],
    ['#FF9900','#FFCC00'],
    ['#339933','#33CC33'],
    ['#CC6699','#CC99CC'],
    ['#009999','#66CCCC']
  ],
  //默认参数
  defaultOpts: {
    id: '', //note默认id是空的
    $ct: $('#content').length>0?$('#content'):$('body'), //有容器就放在容器里，否则放在body里
    context: 'write here'  //Note 默认内容
  },
  //初始化默认参数
  initOpts: function(opts){
    this.opts = $.extend({}, this.defaultOpts, opts||{}) //将默认参数 和 可能传入的参数 合并成新对象，绑定到this.opts 上
    if(this.opts.id){ //设置 Note id
      this.id = this.opts.id
    }
  },
  //创建Note
  createNote: function(){
    var tpl = '<div class="note">'
              + '<div class="note-head"><span class="delete">&times;</span></div>'
              + '<div class="note-ct" contenteditable="true"></div>'
              + '<div class="paper"></div>'
              +'</div>'
    this.$note = $(tpl)
    this.$note.find('.note-ct').html(this.opts.context) //向note写入预设文本
    this.opts.$ct.append(this.$note) //将note添加到$ct中
    if(!this.id) this.$note.css({ //如果this.id 是空的
      left: 'calc(50% - 125px)',
      top: '200px'
    }) 
  },
  //设置样式
  setStyle: function(){
    var color = this.colors[Math.floor(Math.random()*11)]
    this.$note.find('.note-head').css('background-color', color[0])
    this.$note.find('.note-ct').css('background-color', color[1])
    this.$note.find('.paper').css('background-color', color[0])

    var num = 2 * Math.floor(Math.random()*5/2)
    var coin = Math.floor(Math.random()*2)
    if(!coin){
      num = - num
    }
    this.$note.css('transform', 'rotate('+num+'deg)')
  },
  //设置布局
  setLayout: function(){
    if(this.clock){
      clearTimeout(this.clock)
    }
    this.clock = setTimeout(function(){  //使用 setTimeout 是有原因的
      Event.fire('waterfall')
    }, 100)
  },
  //绑定事件
  bindEvent: function(){
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete')

    $delete.on('click', function(){ //点击 x 时 删除note
      if(window.confirm('Do you really want to delete?')) self.delete()
    })
    //但是 contenteditable 没有 change 事件，所以要通过判断元素内容变动，模拟 change，实现 保存
    $noteCt.on('focus', function(){
      if( $noteCt.html() === 'write here' ) $noteCt.html('') //点击时清空默认字符
      $noteCt.data('before', $noteCt.html()) //data()方法用于在匹配元素上存储数据
    }).on('blur paste', function(){
      if( $noteCt.data('before') !== $noteCt.html() ){ //如果失去焦点或者粘贴后，当前$noteCt的html内容和之前存储的数据不一样了
        $noteCt.data('before', $noteCt.html()) //那么就更新存储的数据
        self.setLayout() //重新布局放置
        if(self.id){  //如果是之前已有的 note 
          self.edit($noteCt.html()) //那就发送post请求，提交当前note内容
        }else{ //否则 self.id 是空
          self.add($noteCt.html()) //则新增
        }
      }
    })
    //设置 note 的拖动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left, //计算触发点距离 noteHead 左边缘距离
          evtY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}) //添加拖动状态class 并存储 触发点至 note 边缘距离
    }).on('mouseup', function(){
      $note.removeClass('draggable').removeData('evtPos') //松开鼠标后 移除存储的相对note的坐标
    })
    //鼠标移动时，如果有draggable， 说明是按住note移动的过程， 因此改变相应note据文档的偏移即可 
    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,
        left: e.pageX - $('.draggable').data('evtPos').x
      })
      $('.draggable').length && $('.note').css('user-select', 'none')
    })
  },
  //用于修改
  edit: function(msg){
    var self = this
    $.post('/api/notes/edit', {
      id: this.id,
      note: msg
    }).done(function(ret){
      if(ret.status === 0){
        Event.fire('toast', '修改成功')
      }else{
        Event.fire('toast', '修改失败')
        console.log(ret.errorMsg)
      }
    })
  },
  //用于新增
  add: function(msg){
    var self = this
    $.post('/api/notes/add', {
      note: msg
    }).done(function(ret){
      if(ret.status === 0){
        self.id = ret.data.id  //当前self.id也修改为服务器分配的id，以便继续修改note或者delete发送请求时，携带正确的id
        Event.fire('toast', '创建成功')
      }else{
        Event.fire('toast', '创建失败')
        console.log(ret.errorMsg)
      }
    })
  },
  //用于删除
  delete: function(){
    var self = this
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Event.fire('toast', '删除成功')
          self.$note.remove()
          Event.fire('waterfall')
        }else{
          Event.fire('toast', '删除失败')
          console.log(ret.errorMsg)
        }
      })
  }

}


module.exports.Note = Note