// pages/epc/content-epc/content-epc.js
var userid = wx.getStorageSync('userid')
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgsrc:'',
     oelist:'',
     imgshow:'',
     vin:'',
    scrollHeight:370,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    wx.showLoading({
      title: '加载中',
    })
    let that=this;
    that.setData({
      vin: options.vin
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.request({
      url: network + '/Mattrio/EpcApi/EpcOElist',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "type": options.cartype,
        "parameters": options.parameters,
        "category_id1": options.category_id1,
        "category_id2": options.category_id2,
        'vin': options.vin
      },
      method: 'POST',
      success: function (e) {
        e.data.oe_list.forEach(function(item,index){
          if (item.number == '' || item.number == null || item.number == undefined || item.number == 'undefined'){
            item.number=0
          }

        })
        wx.getImageInfo({
          src: wx.getStorageSync('imgsrc').split("?")[0],
          success(res) {
            var scale=res.width/375;
            var height = wx.getSystemInfoSync().windowHeight-(res.height / scale)-44
            that.setData({
              scrollHeight: height
            })
          }
        })
        that.setData({
          imgsrc: wx.getStorageSync('imgsrc').split("?")[0],
          oelist: e.data.oe_list
        })

        /*加载提示框隐藏*/
        wx.hideLoading()

      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    }) 
  },
  oelist:function(re){
    var that = this;
    wx.navigateTo({
      url: 'oe/oe?title=' + re.currentTarget.dataset.title + '&oe=' + re.currentTarget.dataset.oe + '&location=' + re.currentTarget.dataset.location
    })
  },
  /*图片点击 */
  imgclick:function(){
     let that=this;
     that.setData({
       imgshow:'true'
     })

  },
  /*预览 */
  progress(){
    var url = wx.getStorageSync('imgsrc').split("?")[0]
    wx.previewImage({
      current: 'https' + url.slice('4'), // 当前显示图片的http链接
      urls: ['https' + url.slice('4')] // 需要预览的图片http链接列表
    })
  },
  /*下载 */
  preserve:function(){
    let that=this;
    // console.log(wx.getStorageSync('imgsrc').split("?")[0])
    var url = wx.getStorageSync('imgsrc').split("?")[0]
    const downloadTask = wx.downloadFile({
      url: 'https' + url.slice('4'), //仅为示例，并非真实的资源
      success: function (res) {
        // console.log(res)
        wx.saveImageToPhotosAlbum({/*保存图片到系统相册*/
          filePath: res.tempFilePath,
          success: function (res) {
            // console.log(res)
          },
          fail: function (res) {
            // console.log(res)
            // console.log('fail')
          }
        }) 
      }
    })
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      that.setData({
        progress: res.progress
      })
    })
  },
  cancel:function(){
    let that = this;
    that.setData({
      imgshow: ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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