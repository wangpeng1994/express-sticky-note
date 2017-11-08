
var Event = require('mod/event.js')

function Note(){
  Event.fire('toast', ['note send some message', '2000'])
}

module.exports.Note = Note