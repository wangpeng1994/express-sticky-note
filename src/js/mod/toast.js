require('less/toast.less')

function toast(msg, time){
  this.msg = msg
  this.dismissTime = time||1000
  this.createToast()
  this.showToast()
}
toast.prototype = {
  createToast: function(){
    var tpl = '<div class="toast">' + this.msg + '</div>'
    this.$toast = $(tpl)
    $('body').append(this.$toast)
  },
  showToast: function(){
    var self = this
    this.$toast.fadeIn(300, function(){
      setTimeout(function(){
        self.$toast.fadeOut(300, function(){
          self.$toast.remove()
        })
      }, self.dismissTime)
    })
  }
}

function Toast(msg, time){
  return new toast(msg, time)
}

//window.Toast = Toast
module.exports.Toast = Toast  
//注意，module.exports 本身是对象，所以不能直接赋值为 Toast 函数，但是给这个对象新增方法