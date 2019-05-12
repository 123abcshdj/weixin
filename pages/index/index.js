Page({
  onLoad:function(){

    var that = this
      console.log('onLoad');
      
      wx.request({
        url:  'http://huangziling.xyz/web/t.php', //真实的接口地址
          data:  {
    
    },
    method:'get',
          header:  {
              'content-type':  'application/json'
          },
          success:  function  (res)  {
            console.log(res);
              that.setData({
                 result:res.data //设置数据
              })
          },
          fail:  function  (err)  {
              console.log(err)
          }
      })
  }
})
