Page({
  /*页面的初始数据*/
  data: {　　//初始化为空
    source: ''
  },
  /*上传图片 */
  uploadimg: function () {
    var that = this;/*将当前的this对象复制一份到that变量中.*/
    wx.chooseImage({ //从本地相册选择图片或使用相机拍照
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {
        //console.log(res)
        //前台显示
        wx.showToast({ title: '正在上传…', icon: 'loading'/*图标*/, mask: true, duration: 200 })
        that.setData({
          source: res.tempFilePaths
          //有问题
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://www.website.com/home/api/uploadimg',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {//打印
            console.log(res.data)
          }
        })
      }
    })

  },
  data: {
    isfingerPrint: false,    //可否使用指纹识别  默认false
    isfacial: false,          //可否使用人脸识别  默认false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //查看支持的生物认证   比如ios的指纹识别   安卓部分机器是不能用指纹识别的
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        for (var i in res.supportMode) {
          if (res.supportMode[i] == 'fingerPrint') {
            console.log("支持指纹识别", res.supportMode[i]);
            that.setData({
              isfingerPrint: true
            })
          } else if (res.supportMode[i] == 'facial') {
            console.log("支持人脸识别", res.supportMode[i]);
          }
        }
      }
    })
  },
  //是否可以指纹识别
  checkIsFingerPrint: function () {
    var boole = this.data.isfingerPrint
    var txt = "不可以使用指纹识别"
    if (boole) {
      txt = "可以使用指纹识别"
    }
    show("提示", txt, false);
  },
  //是否可以人脸识别
  checkIsFacial: function () {
    var boole = this.data.isfacial
    var txt = "不可以使用人脸识别"
    if (boole) {
      txt = "可以使用人脸识别"
    }
    function SUCC() {
      console.log("用户点击确定")
    }

    function FAIL() {
      console.log("用户点击取消")
    }

    show("提示", txt, true, SUCC, FAIL);
  },

  //进行指纹识别
  FingerPrint: function () {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹',
      success(res) {
        console.log("识别成功", res)
        show("提示", "识别成功", false);
      },
      fail(res) {
        console.log("识别失败", res)
        show("提示", "识别失败", false);
      }
    })


  },
  closed: function () {
    var aaa = document.getElementById("ad");
    aaa.style.display = "none"
  },

  test: function () {
    var test = document.getElementByld("input").src;
    window.alert(test);
  }
  ,


  uploader: function () {

    var that = this;

    let imagesList = [];

    let maxSize = 1024 * 1024;

    let maxLength = 3;

    let flag = true;

    wx.chooseImage({

      count: 6, //最多可以选择的图片总数

      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {

        wx.showToast({

          title: '正在上传...',

          icon: 'loading',

          mask: true,

          duration: 500

        })

        for (let i = 0; i < res.tempFiles.length; i++) {

          if (res.tempFiles[i].size > maxSize) {

            flag = false;

            console.log(111)

            wx.showModal({

              content: '图片太大，不允许上传',

              showCancel: false,

              success: function (res) {

                if (res.confirm) {

                  console.log('用户点击确定')

                }

              }

            });

          }



        }

        if (res.tempFiles.length > maxLength) {

          console.log('222');

          wx.showModal({

            content: '最多能上传' + maxLength + '张图片',

            showCancel: false,

            success: function (res) {

              if (res.confirm) {

                console.log('确定');

              }

            }

          })

        }

        if (flag == true && res.tempFiles.length <= maxLength) {

          that.setData({

            imagesList: res.tempFilePaths

          })

        }

        wx.uploadFile({

          url: 'https://shop.gxyourui.cn',

          filePath: res.tempFilePaths[0],

          name: 'images',

          header: {

            "Content-Type": "multipart/form-data",

            'Content-Type': 'application/json'

          },

          success: function (data) {

            console.log(data);

          },

          fail: function (data) {

            console.log(data);

          }

        })

        console.log(res);

      },

      fail: function (res) {

        console.log(res);

      }

    })

  },








})
