// pages/inde/vin/vin.js
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vin: '',
  },
/*VIN查询 */
  input:function(e){
    let that = this
    that.setData({
      vin: e.detail.value.replace(/[^\w\.\/]/ig, '')
    })
  },
  btnclick: function () {
    let that = this
    if (that.data.vin == '') {
      wx.showToast({
        title: 'VIN不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.vin.match(/^\w{17}$/) == null) {
      wx.showToast({
        title: 'VIN格式不对',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.showLoading({
      title: '加载中',
    })
    var userid = wx.getStorageSync('userid')
    // console.log(userid)
    wx.request({
      url: network + '/Mattrio/VinInterface/queryvin',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "vin": that.data.vin
      },
      method: 'POST',
      success: function (e) {
        wx.hideLoading()
        // console.log(e.data.list)
        if (e.data.recode == -3) {
          wx.showToast({
            title: '找件儿：' + e.data.msg,
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (e.data.recode == -999) {
          wx.showToast({
            title: '找件儿：' + e.data.msg,
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (e.data.recode == -5) {
          wx.showToast({
            title: '找件儿：' + e.data.msg,
            icon: 'none',
            duration: 1000
          })
          return false;
        } 
        if (e.data.list == [] || e.data.list.length == 0) {
          wx.navigateTo({
            url: '../../nodata/nodata'
          })
        } else {
          wx.setStorageSync('data', e.data.list)
          wx.navigateTo({
            url: '../../particulars/particulars?vin=' + that.data.vin
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // console.log(options.vin)
    if (options.vin==''){
      wx.showToast({
        title: '识别失败，请手动进行输入',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    that.setData({
      vin: options.vin
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