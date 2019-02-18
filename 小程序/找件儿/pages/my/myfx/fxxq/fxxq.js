// pages/my/myfx/fxxq/fxxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
      that.setData({
        fxlist: JSON.parse(options.zflist)
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
    var fxlist = that.data.fxlist
    console.log(that.data.fxlist)
    var arr=[]
    let arrr=[]
    let name=[]
    wx.showLoading({
      title: '加载中',
    })
    fxlist.forEach(function (item, index) {
      if (arr.indexOf(item.mikey)<0){
        console.log(arr.indexOf(item.mikey))
        arr.push(item.mikey)
        wx.request({
          url: 'https://www.51macc.com/Mattrio/CarInterface/query_mikey',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "userid": '808c1a13-8cb9-1035-9ce5-6abd7619172b',
            "mikey": item.mikey
          },
          method: 'POST',
          success: function (re) {
            console.log(re)
            name.push(re.data.list[0].Manufacture_CN + ' ' + re.data.list[0].Vehicle_Name_CN + ' ' + re.data.list[0].Capacity)
            that.setData({
              name: name
            })
          }, fail: function () {
            wx.showToast({
              title: '找件儿：请求数据失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })
    arr.forEach(function (item, index) {
      arrr.push([])      
      fxlist.forEach(function (ite, inde) {
        if (ite.mikey == item) {
          console.log(arr.indexOf(ite.mikey))
          arrr[index].push(ite)
        }
      })
    })
    /*加载提示框隐藏*/
    wx.hideLoading()
    that.setData({
      arrr: arrr
    })
    wx.showToast({
      title: '点击下方按钮进行分享',
      icon: 'none',
      duration: 1500
    })
    
    // wx.showLoading({
    //   title: '加载中',
    // })
    /*获取第一个年份对应的排量*/
    // wx.request({
    //   url: network + '/Mattrio/CarInterface/CheckButton',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     "mikey": data.mikey
    //   },
    //   method: 'POST',
    //   success: function (e) {
    //     /*加载提示框隐藏*/
    //     wx.hideLoading()
        
    //   }, fail: function () {
    //     wx.showToast({
    //       title: '找件儿：请求数据失败',
    //       icon: 'none',
    //       duration: 1000
    //     })
    //   }
    // })
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
    let that=this;
    return {
      title: '找件儿：我的分享',
      path: '/pages/my/myfx/fxxq/fxxq?zflist=' + JSON.stringify(wx.getStorageSync('myfx'))
    }
    
  }
})