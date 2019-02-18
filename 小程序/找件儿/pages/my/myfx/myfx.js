// pages/my/myfx/myfx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: '',
    startY:'',
    moveX: '',
    endX:'',
    fxlist: '',
    left:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  start(e){
    let that=this;
    /* 开始触摸点的X Y坐标*/
      that.setData({
        startX: e.touches[0].clientX,  
        startY: e.touches[0].clientY    
      })
  },
  move(e) {
    let that = this;
    // console.log(e)
    /*获取当前元素 */
    let list = that.data.fxlist[e.currentTarget.dataset.index];
    /*move坐标 */
    that.setData({
      moveX: e.touches[0].clientX
    })
     /*实时水平滑动距离 */
    var leftpx = that.data.startX - that.data.moveX;
     /*实时垂直滑动距离 */
    var top = that.data.startY - e.touches[0].clientY;
    /*垂直滑动距离过大 取消左滑动 */
    if (Math.abs(top)>=68){
        list.left = 0
    }else{
      if (leftpx <= 0) {
        list.left = 0
      } else {
        /*否则进行左划判断 */
        list.left = -leftpx
        if (leftpx >= 90) {
          list.left = -90
        }
      }
    }
    /*更新数组 */
    that.setData({
      fxlist: that.data.fxlist
    })
  },  
  end(e) {    
    let that=this;
    // console.log(e)
    /*结束点的X坐标 */
    that.setData({
      endX: e.changedTouches[0].clientX
    })
    /*水平滑动的距离 */
    var endpx = that.data.startX - that.data.endX
    let list = that.data.fxlist[e.currentTarget.dataset.index]
    var top = that.data.startY - e.changedTouches[0].clientY
    if (Math.abs(top) >= 68){
      list.left = 0
    }else{
      if (endpx <= 45) {
        list.left = 0
      } else {
        list.left = -90
      }
    }
    that.setData({
      fxlist: that.data.fxlist
    })
  },
  /*删除 */
  delete(e){
    let that=this;
    let fxlists = that.data.fxlist
    fxlists.splice(e.currentTarget.dataset.index,1)
    that.setData({
      fxlist: fxlists
    })
    wx.setStorageSync('myfx', that.data.fxlist)
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  /*清空 */
  qkclick(){
    let that = this;   
    wx.setStorageSync('myfx', [])
    that.setData({
      fxlist: wx.getStorageSync('myfx')
    })
  },
  fxxq() {
    let that = this;
    wx.navigateTo({
      url: 'fxxq/fxxq?zflist=' + JSON.stringify(wx.getStorageSync('myfx'))
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
    let that = this;
    wx.showToast({
      title: '点击确认进入分享',
      icon: 'none',
      duration: 1000
    })
    // console.log(wx.getStorageSync('myfx')) 
    that.setData({
      fxlist: wx.getStorageSync('myfx')
    })
    that.data.fxlist.forEach(function (item, index) {
      item.left = 0
    })
    that.setData({
      fxlist: that.data.fxlist
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