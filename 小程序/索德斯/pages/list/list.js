// pages/list/list.js
var appname = wx.getStorageSync('appname');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    var datalist = JSON.parse(wx.getStorageSync('datalist'));
    // console.log(datalist)
    var hash = {};
    var result = [];
    for (var i = 0; i < datalist.length; i++) {
      // console.log(datalist[i])
      if (!hash[datalist[i].product_id]) {
        result.push(datalist[i]);
        hash[datalist[i].product_id] = true;
      }
    }    
    let username_id = wx.getStorageSync('username_id')
    result.forEach(function(item,index){
      /*拼接图片路径 */
      item.img = 'http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/suodesi/' + item.oenumber + '.jpg'
    })
    that.setData({
      datalist: result
    })
  },
  /*列表点击 */
  listclick(e){
    let that=this;
    let id = e.currentTarget.dataset.id;
    let datalist = that.data.datalist;
    wx.setStorageSync('particular', JSON.stringify(datalist[id]));
    wx.navigateTo({
      url: 'particulars/particulars'
    })
  },
  /*图片没有时 */
  imgerror(e){
    // console.log(e)
    let that=this;
    let index = e.target.dataset.index;
    /*没有图片时显示的图片 */
    that.data.datalist[index].img = '../image/blank.jpg'
    that.setData({
      datalist: that.data.datalist
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