var Note = require('mod/note.js').Note
var Event = require('mod/event.js')


var NoteManager = (function(){
  
  function load(){
    $.get('/api/notes')
      .done(function(ret){
        if(ret.status === 0){
          $.each(ret.data, function(idx, note){
            new Note({
              id: note.id,
              context: note.text
            })
          })
          Event.fire('waterfall')
        }else{
          Event.fire('toast', '初始化失败')
          console.log(ret.errorMsg)
        }
      })
      .fail(function(){
        Event.fire('toast', '网络异常')
      })
  }

  function add(){
    new Note()
  }

  return {
    load: load,
    add: add
  }

})()

module.exports = NoteManager