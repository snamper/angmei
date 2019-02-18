// pages/my/opinion/opinion.js
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '',
    name:''
  },
  textarea(e) {
    let that=this;
    that.setData({
      textarea: e.detail.value
    })
  },
  input(e){
    let that = this;
    that.setData({
      name: e.detail.value
    })
  },
  btn(){
    let that = this;    
    if (that.data.textarea == '') {
      wx.showToast({
        title: '留言不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: network + '/Mattrio/OeProductErrorCorrectionInterface/addFeedbackSuggestion',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "type": "功能建议",
        "msg": that.data.textarea,
        "user_name": that.data.name ,
        "user_phone": that.data.phone
      },
      method: 'POST',
      success: function (re) {
       
        /*加载提示框隐藏*/
        wx.hideLoading()
      }, fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
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
    let that=this
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: network + '/Mattrio/LoginInterface/appwxlogin',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "openid": openid,
        "nickname": openid
      },
      method: 'POST',
      success: function (re) {
        console.log(re.data.phone)
        if (re.data.phone == '' || re.data.phone.length == 0) {
          console.log(1)
          wx.navigateTo({
            url: '../login/login',
          })
          return false;
        }else{
          that.setData({
           phone:re.data.phone
          })
        }
        /*加载提示框隐藏*/
        // wx.hideLoading()
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
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