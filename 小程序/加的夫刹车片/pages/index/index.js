// pages/ocr/ocr.js
var network = wx.getStorageSync('network');
var username_id = wx.getStorageSync('username_id');
var base = require('../../utils/base.js');
var appname = wx.getStorageSync('appname');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"0",
    oe:'',
    vin:'',
    imgurl:[
      '../image/jdf1.jpg',
      '../image/jdf2.jpg',
      '../image/jdf3.jpg'
    ]
  },
/*tab切换点击 */
  tabclick(e){
    // console.log(e)
    let that=this;
    that.setData({
      num: e.target.dataset.num
    })
  },
  /*swiper事件 */
  swiperchange(e){
    let that=this;
    that.setData({
      num: e.detail.current
    })
  }, 
  /*车型页面 */
  car(){
    wx.navigateTo({
      url: '../car/car',
    })
  },
   /*VIN查询 */
  vininput(e) {
    let that = this;
    // console.log(e)
    that.setData({
      vin: e.detail.value
    })
  },
  vinclick(){
    let that = this;
    base.VIN(that, username_id,that.data.vin)
  },
  /*oe查询 */
  oeinput(e){
    let that=this;
    // console.log(e)
    that.setData({
      oe: e.detail.value
    })
  },
  oeclick(){
    let that=this;
    /*oe查询 */
    base.OE(that, username_id, that.data.oe)
  },
  /*ocr识别 */
  ocrclick(){
    wx.navigateTo({
      url: '../ocr/ocr?source=1'
    })
  },
  /* 联系方式*/
  call(){
    wx.makePhoneCall({
      phoneNumber: '' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    if (options.vin != undefined && options.vin != 'undefined' && options.vin != '') {
      that.setData({
        num: 0,
        vin: options.vin
      })
    } else if (options.vin == '') {
      base.showToast('识别失败', 'none', 1e3)
    }
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
    /*获取版本判断是否需要更新 */
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showToast({
        title: '新的版本下载失败',
        icon: 'none',
        duration: 1000
      })
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
    return {
      title: appname,
      path: '/pages/index/index'
    }
  }
})