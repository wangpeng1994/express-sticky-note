
function _WaterFall($ct){
  this.init($ct)
}

_WaterFall.prototype = {
  init: function($ct){
    var self = this
    this.render($ct)
    $(window).on('resize', function(){
      self.render($ct)
    })
  },
  render: function($ct){
    var $items = $ct.children(),
      nodeWidth = $items.outerWidth(true),
      colNum = parseInt( $(window).width()/nodeWidth ),
      colSumHeight = []
    for(var i =0; i < colNum; i++){ //初始化数组
      colSumHeight[i] = 0 
    }
    $items.each(function(){  //针对每一个item,找到数组最小值，和下标
      var minValue = Math.min.apply(null, colSumHeight) //非严格模式下，null自动指向全局对象
      var minIndex = colSumHeight.indexOf(minValue)
      $(this).css({
        top: minValue,
        left: nodeWidth * minIndex //outerWidth是边框和外边距，默认false，true代表包括margin
      })
      colSumHeight[minIndex] += $(this).outerHeight(true) //更新当前数组下标里存储的高度，另外瀑布流高度是不一样的，所以这里是遍历时的高度
    })
  }
}

function WaterFall($ct){
  return new _WaterFall($ct)
}

module.exports = WaterFall

// var WaterFall = require('waterfall')
// WaterFall($ct)


