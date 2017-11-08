var EventCenter = (function(){
  var events = {}

  //订阅绑定事件
  function on(evt, handler){
    events[evt] = events[evt] || []
    events[evt].push({
      handler: handler
    })
  }

  //发布触发事件
  function fire(evt, args){
    if(!events[evt]){
      return
    }
    for(var i = 0; i < events[evt].length; i++){
      events[evt][i].handler(args)
    }
  }

  return {
    on: on,
    fire: fire
  }

})()

module.exports = EventCenter





/**usage

//饭做好了: [function(data){console.log(data + '流口水了')}, function(data){console.log(data + '咬了一口真好吃')}]

EventCenter.on('饭做好了', function(data){
  console.log(data + '流口水了')
})

EventCenter.on('饭做好了', function(data){
  console.log(data + '咬了一口真好吃')
})

EventCenter.fire('饭做好了', '小明')

*/