// pages/inde/inde.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tab:[
        {
          src:'../image/tab_1.png'
        },
        {
          src: '../image/tab_2.png'
        },
        {
          src: '../image/tab_3.png'
        }
      ],
    tabBanner:[
      {
        src:'../image/1.jpg',
        title:'氧传感器'
      },
      {
        src: '../image/2.jpg',
        title: '氧传感器'
      },
      {
        src: '../image/3.jpg',
        title: '氧传感器'
      },
      {
        src: '../image/4.jpg',
        title: '氧传感器'
      },
    ]
  },
  tabClick(e){
    console.log(e)
    switch (e.target.dataset.index){
      case 0:
        wx.navigateTo({
          url: './gywm/gywm'
        })
        break;
      case 1:
        wx.navigateTo({
          url: './jrwm/jrwm'
        })
        break;
      case 2:
        wx.navigateTo({
          url: './lxwm/lxwm'
        })
        break;
      default:
        
    }
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
      path: '/pages/inde/inde'
    }
  }
})