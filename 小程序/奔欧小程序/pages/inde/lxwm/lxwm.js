// pages/inde/jrwm/jrwm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phoneStr:[
        {
          name:'杭州总部',
          phone:'0571-28102209'
        },
        {
          name: '杭州总部',
          phone: '0571-28102214'
        },
        {
          name: '杭州总部',
          phone: '0571-28102217'
        },
        {
          name: '上海必能直营',
          phone: '13588858376'
        },
        {
          name: '杭州必能直营',
          phone: '13065708111'
        },
        {
          name: '北京必能直营',
          phone: '13810872955'
        },
        {
          name: '郑州必能直营',
          phone: '15968128191'
        },
        {
          name: '西安必能直营',
          phone: '15319782769'
        },
        {
          name: '广西必能直营',
          phone: '18978985766'
        },
        {
          name: '哈尔滨必能直营',
          phone: '18845635888'
        },
        {
          name: '广州必能',
          phone: '13678966215'
        },

      ]
  },
  callPhone(e){
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '氧传感器查询系统',
      path: '/pages/inde/lxwm'
    }
  }
})