//index.js
const app = getApp()

Page({
  var that = this//获取本身对象 wx.之中无法使用this
      wx.request({//发起网络请求
    url: '地址/webservice文件/方法名',//地址
    data:
    {
      open_id: app.globalData.open_id,//openid
      username: that.data.username,//帐号
      password: that.data.password//密码
    },
    method: 'POST',
    success: function (result) {//成功回调函数
      var zt = result.data.d;
      //console.log(zt)
      if (zt == "false") {//失败提示
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '帐号/密码错误！',
          success: function (res) { }
        })
      } else {//成功全局变量储存用户id并跳页
        app.globalData.p_id = result.data.d
        wx.switchTab({
          url: '../index/index'
        })
      }
    },
    fail: function (err) {
      wx.showToast({
        title: '网络错误，请尝试刷新本页！',
        icon: 'none',
        duration: 2000
      })
      console.log(err)
    }
  })

})
