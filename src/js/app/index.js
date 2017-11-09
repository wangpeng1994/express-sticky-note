//require('less/index.less')

var NoteManager = require('mod/note-manager.js')
var Event = require('mod/event.js')
var WaterFall = require('mod/waterfall.js')
var Toast = require('mod/toast.js').Toast
var GoTop = require('mod/go-top.js').GoTop

NoteManager.load()

$('.add-note').on('click', function(){
  NoteManager.add()
})

Event.on('waterfall', function(){
  WaterFall($('#content'))
})

Event.on('toast', function(args){
  if(args instanceof Array){
    var msg = args[0],
      time = args[1]
    Toast(msg, time)
  }else{
    Toast(args)
  }
})

GoTop()