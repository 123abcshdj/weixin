//logs.js


Page({
  data: {
  
  },
 
 //返回上一页
backBtn:function(){
  wx.navigateBack()
},


 
    onLoad: function () {

    var that = this
    console.log('onLoad');

    wx.request({
      url: 'https://huangziling.xyz/web/t.php', //真实的接口地址
      data: {
        name: 0
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          message: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }




})
