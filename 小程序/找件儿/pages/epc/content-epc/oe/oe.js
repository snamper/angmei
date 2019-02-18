// pages/epc/content-epc/oe/oe.js
var userid = wx.getStorageSync('userid')
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'',
    title:'',
    oelist:'',
    location:'',
    imgshow: ''
  },
  /*图片点击 */
  imgclick: function () {
    let that = this;
    that.setData({
      imgshow: 'true'
    })

  },
  /*预览 */
  progress() {
    var url = wx.getStorageSync('imgsrc').split("?")[0]
    wx.previewImage({
      current: 'https' + url.slice('4'), // 当前显示图片的http链接
      urls: ['https' + url.slice('4')] // 需要预览的图片http链接列表
    })
  },
  /*下载 */
  preserve: function () {
    let that = this;
    console.log(wx.getStorageSync('imgsrc').split("?")[0])
    var url = wx.getStorageSync('imgsrc').split("?")[0]
    const downloadTask = wx.downloadFile({
      url: 'https' + url.slice('4'), //仅为示例，并非真实的资源
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      }
    })
    downloadTask.onProgressUpdate((res) => {
      // console.log('下载进度', res.progress)
      that.setData({
        progress: res.progress
      })
    })
  },
  cancel: function () {
    let that = this;
    that.setData({
      imgshow: ''
    })
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
        title: options.title
      })
      wx.request({
        url: network + '/Mattrio/OeInterface/queryOenumber',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "oenumber": options.oe.replace(/\s/g, "").replace(/\-/g, ""),
          "userid": userid
        },
        method: 'POST',
        success: function (e) {
          that.setData({
            oelist: e.data.list,
            location: options.location,
            imgsrc: wx.getStorageSync('imgsrc').split("?")[0]
          })
            wx.request({
              url: network + '/Mattrio/ProductInterface/getOeCars',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                "oenumber": options.oe.replace(/\s/g, "").replace(/\-/g, ""),
                "userid": userid
              },
              method: 'POST',
              success: function (e) {
                /*加载提示框隐藏*/
                wx.setStorageSync('cartype', e.data.list)
                wx.hideLoading()
              }, fail: function () {
                wx.showToast({
                  title: '找件儿：请求数据失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }) 
        }, fail: function () {
          wx.showToast({
            title: '找件儿：请求数据失败',
            icon: 'none',
            duration: 1000
          })
        }
      }) 
  },
  cartype: function () {
    var that = this;
    wx.navigateTo({
      url: 'cartype/cartype?title='+that.data.title
    })
  },
  /*添加到分享列表 */
  tjmyfx(){
    let that=this;
    let fxlist = wx.getStorageSync('myfx');
    console.log(typeof wx.getStorageSync('myfx'))
    console.log(that.data.oelist[0])
    let mikey= wx.getStorageSync('mikey')
    let num=0
    fxlist.forEach(function (item, index) {
      if (item.oe_number != that.data.oelist[0].oe_numbers){
        num++
      }
    })
    if (num == fxlist.length){
      fxlist.push({
        'category_name': that.data.oelist[0].category_name,
        'name1': that.data.oelist[0].name1,
        'note_parts': "",
        'oe_number': that.data.oelist[0].oe_numbers,
        'parent_name': that.data.oelist[0].parent_name,
        'price': that.data.oelist[0].system_market_price,
        "mikey": mikey
      })
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '该配件已添加',
        icon: 'none',
        duration: 1500
      })
    }
    wx.setStorageSync('myfx', fxlist)
  },
  fxlb(){
    wx.navigateTo({
      url: '../../../my/myfx/myfx'
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