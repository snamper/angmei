// pages/my/my.js
var network = wx.getStorageSync('network')
var userid = wx.getStorageSync('userid')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sq:true,
    nickName:'',
    loginshow: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
  },
  /*联系我们*/
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: '02152212966' //仅为示例，并非真实的电话号码
    })
  },
 /*留言*/
 opinion: function () {
   if (this.data.nickName == '') {
     wx.showToast({
       title: '请在首页点击授权按钮',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   wx.navigateTo({
     url: 'opinion/opinion',
   })
 },
 /**关于我们 */
 aboutus:function(){
   wx.navigateTo({
     url: 'aboutus/aboutus',
   })
 },
 /*我的分享 */
 myfx: function () {
   if (this.data.nickName == '') {
     wx.showToast({
       title: '请在首页点击授权按钮',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   wx.navigateTo({
     url: 'myfx/myfx',
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
    var openid = wx.getStorageSync('openid')
    let that = this;
    wx.getUserInfo({
      lang: 'zh_CN ',
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
        })
        wx.request({
          url: network + '/Mattrio/LoginInterface/appwxlogin',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "openid": openid,
            "nickname": that.data.nickName
          },
          method: 'POST',
          success: function (re) {
            wx.setStorageSync('userid', re.data.user_id)
            if (re.data.phone == '' || re.data.phone.length == 0) {
              that.setData({
                loginshow: !1
              })
              return false;
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
      }, fail: function (res) {
        wx.showToast({
          title: '请在首页点击授权按钮',
          icon: 'none',
          duration: 1500
        })
        return false;
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