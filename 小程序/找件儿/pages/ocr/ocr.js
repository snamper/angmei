Page({
  /**
   * 页面的初始数据
   */
  data: {

    imageSrc: '',
    isShowImg: false,
    show:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    var _this = this
    wx.createCameraContext().takePhoto({
      quality: 'high',
      success: (res) => {
        _this.setData({
          imageSrc: res.tempImagePath
        })
				_this.getImageInfo(_this.data.imageSrc)
      }
    })
  },
  error(e) {
    let that=this;
    wx.showToast({
      title: '请允许调用摄像头',
      icon: 'none',
      duration: 1000
    })
    that.setData({
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  getImageInfo(e) {
    console.log(e)
    var _this = this
    // 将图片写入画布
    const ctx = wx.createCanvasContext('myCanvas')
		var w=wx.getSystemInfoSync().windowWidth		
		var h=wx.getSystemInfoSync().windowHeight - 100
		console.log(w)		
		console.log(h)
    ctx.drawImage(e, 0, 0, w, h),
    ctx.draw(true, () => {
      wx.canvasToTempFilePath({
        x: w * .4,
        y:h * .1,
        width: 80,
        height:h * .8,
        destWidth: 80,
        destHeight: h * .8,
        canvasId: 'myCanvas',
        success: function (res) {
					console.log(res)
          _this.setData({
            osrc: res.tempFilePathd
          })
          console.log(res.tempFilePath)
          wx.showLoading({
            title: '上传中，请稍后...',
          })
            wx.uploadFile({
              url: 'https://www.51macc.com/api//Mattrio/OcrInterface/OcrVin', //仅为示例，非真实的接口地址
              filePath: res.tempFilePath,
              name: 'file',
              success (re) {
                console.log('vin'+re)
                wx.hideLoading()
                var data = JSON.parse(re.data)
                console.log(data)
                if (data.ErrorCode==0){
                  var vin = data.VIN
                } else { 
                  var vin =''                
                }
                wx.navigateTo({
                  url: '../inde/vin/vin?vin=' + vin
                })
              }, fail(re){
                console.log(re)
                wx.hideLoading()
                wx.navigateTo({
                  url: '../inde/vin/vin?vin='
                })
              }
            })
        }
      })
    })

  },
  xiangce:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        wx.showLoading({
          title: '上传中，请稍后...',
        })
        wx.uploadFile({
          url: 'https://www.51macc.com/api//Mattrio/OcrInterface/OcrVin', //
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (re) {
            wx.hideLoading()            
            console.log(re)
            var data = JSON.parse(re.data)
            console.log(data)
            if (data.ErrorCode == 0) {
              var vin = data.VIN
            } else {
              var vin = ''
            }
            wx.navigateTo({
              url: '../inde/vin/vin?vin=' + vin
            })
          }, fail: function () {
            wx.hideLoading()             
            wx.navigateTo({
              url: '../inde/vin/vin?vin='
            })
          }
        })
        

      }
    })
  },
  /*调起客户端小程序设置界面*/
  shouquan() {
    let that=this;
    wx.openSetting({
      success: (res) => {
        console.log(res.authSetting)        
        if (res.authSetting["scope.camera"] == true) {
          console.log(1)
          wx.showToast({
            title: '摄像头已允许，请返回重新进行',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            show: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.camera']) {
    //       wx.authorize({
    //         scope: 'scope.camera',
    //         success() {
    //           // 用户已经同意小程序使用摄像头功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.createCameraContext()
    //         }, fail() {
    //           wx.showToast({
    //             title: '请允许调用摄像头进行识别VIN码',
    //             icon: 'none',
    //             duration: 1000
    //           })
    //           that.setData({
    //             show: true
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '找件儿',
      imageUrl: '/pages/image/car.jpg',
      path: '/pages/inde/inde'
    }
  }
})