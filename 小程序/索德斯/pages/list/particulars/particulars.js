// pages/index/particulars/particulars.js
var network = wx.getStorageSync('network');
var username_id = wx.getStorageSync('username_id');
var base = require('../../../utils/base.js');
var appname = wx.getStorageSync('appname');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    particular:'',
    cartypelist:'',
    bm: '',
    bianma: '',
    meng: false,
    bminput: '',
    phoneinp: '',
    nameinp: '',
    info:''
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let particular = JSON.parse(wx.getStorageSync('particular'))
    // console.log(particular)
    that.setData({
      particular: particular,
      bm: particular.product_id
    })
    /*显示消息提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/ProductIntface/getProductLongCars','POST',
    {
      "brand_id": username_id,
      "product_id": that.data.particular.product_id
    },
    function(e){
      /*隐藏消息提示框 */
      wx.hideLoading();
      e.data.info.forEach(function(item,index){
        if (item.describe == particular.category_name){
          e.data.info.splice(index,1)
        }
      })
      that.setData({
        cartypelist:e.data.list,
        info: e.data.info
      })

    }
    )

  },
  imgerror(){
    let that = this;
    /*没有图片时显示的图片 */
    that.data.particular.img = '../../image/blank.jpg'
    that.setData({
      particular: that.data.particular
    })
  },
  /*您产品编码 */
  bm(e) {
    let that = this;
    that.setData({
      bminput: e.detail.value
    })
  },
  /*手机号 */
  phone(e) {
    let that = this;
    console.log(e)
    that.setData({
      phoneinp: e.detail.value
    })
  },
  /*姓名 */
  name(e) {
    let that = this;
    console.log(e)
    that.setData({
      nameinp: e.detail.value
    })
  },
  /*提交 */
  tjclick() {
    let that = this;
    if (that.data.bminput == "") {
      wx.showToast({
        title: '请填写您的产品编号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //验证电话号码
    var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
    if (that.data.phoneinp.match(reg) == null) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.nameinp == "" || that.data.nameinp == undefined || that.data.nameinp == 'undefined') {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    var bminput = that.data.bminput
    var nameinp = that.data.nameinp
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/ProductErrorCorrectionIntface/addProductErrorCorrection', 'POST',
      {
        "brand_id": username_id,
        "product_id": that.data.bm,
        "new_product_id": bminput,
        "phone": that.data.phoneinp,
        "name": nameinp
      },
      function (ev) {
        that.setData({
          meng: false
        })
        /*加载提示框隐藏*/
        wx.hideLoading()
      }
    )
  },
  /*取消 */
  qxclick() {
    let that = this;
    that.setData({
      meng: false
    })
  },
  /*显示 */
  show() {
    let that = this;
    that.setData({
      meng: true
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
    return {
      title: appname,
      path: '/pages/index/index'
    }
  }
})