// pages/epc/epc.js
var userid = wx.getStorageSync('userid')
var network = wx.getStorageSync('network')
Page({

  /**leftclick
   * 页面的初始数据
   */
  data: {
    num:'0',
    wheight: '',
    category_id1:'',
    cartype:'',
    vin:''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    let that=this;
    that.setData({
      vin: options.vin
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network + '/Mattrio/EpcApi/EpcCategory1',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "type": options.type,
        "mikey": options.mikey,
        "vin": options.vin
      },
      method: 'POST',
      success: function (e) {
       wx.setStorageSync('mikey', options.mikey)
       wx.request({
         url: network + '/Mattrio/EpcApi/EpcCategory2',
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         data: {
           "userid": userid,
           "parameters": e.data.parameters,
           "category_id1": e.data.categorys1[0].category_id1,
           "type": options.type
         },
         method: 'POST',
         success: function (data) {
           /*加载提示框隐藏*/
             wx.hideLoading()
             that.setData({
               categorys1: e.data.categorys1,
               categorys2: data.data.categorys2,
               parameters: e.data.parameters,
               cartype: options.type,
               category_id1: e.data.categorys1[0].category_id1,
               type: options.type,
               wheight:wx.getSystemInfoSync().windowHeight
             })
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
  leftclick:function(re){
    wx.showLoading({
      title: '加载中',
    })
    let that=this;
    // console.log(re.currentTarget.dataset.index)
    wx.request({
      url: network + '/Mattrio/EpcApi/EpcCategory2',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "parameters": that.data.parameters,
        "category_id1": re.currentTarget.dataset.text,
        "type": that.data.type
      },
      method: 'POST',
      success: function (e) {
        // console.log(e.data.categorys2)
        /*加载提示框隐藏*/
        wx.hideLoading()
        that.setData({
          num: re.currentTarget.dataset.index,
          categorys2: e.data.categorys2,
          category_id1: re.currentTarget.dataset.text, 
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
  // listclick
/*list点击 */
  listclick:function(re){
    var that=this;
    wx.setStorageSync('imgsrc', re.currentTarget.dataset.src)
    wx.navigateTo({
      url: 'content-epc/content-epc?parameters=' + that.data.parameters + '&category_id1=' + that.data.category_id1 + '&category_id2=' + re.currentTarget.dataset.id + '&cartype=' + that.data.cartype +  '&title=' + re.currentTarget.dataset.title+'&vin='+that.data.vin
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