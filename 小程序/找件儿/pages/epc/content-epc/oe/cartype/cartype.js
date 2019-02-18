// pages/epc/content-epc/oe/cartype/cartype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartypelist: '',
    inp: '',

  },
  input: function (e) {
    let that = this;
    that.setData({
      inp: e.detail.value
    })
    let one='' 
    let tdata = that.data;
    let arr = [];
    tdata.cartypelist.forEach(function (item, index) {
      if (tdata.cartypelist[index].Manufacture_CN.indexOf(tdata.inp.replace(/\s+/g, "")) != -1 || tdata.cartypelist[index].Vehicle_of_year.indexOf(tdata.inp.replace(/\s+/g, "")) != -1 || tdata.cartypelist[index].Name_of_sales.indexOf(tdata.inp.replace(/\s+/g, "")) != -1 || tdata.cartypelist[index].Vehicle_Name_CN.indexOf(tdata.inp.replace(/\s+/g, "")) != -1) {
        arr.push(item)
      }
    })
    if (arr != [] || arr.length !=0) {
      one='A0'
    } else {
      one = ''
    }  
    that.setData({
      arr: arr,
      show: true,
      one: one
    })
  },
  btn: function () {
    let that = this;
    let tdata = that.data;
    let arr = [];
    tdata.cartypelist.forEach(function (item, index) {
      if (tdata.cartypelist[index].Manufacture_CN.indexOf(tdata.inp) != -1 || tdata.cartypelist[index].Vehicle_of_year.indexOf(tdata.inp) != -1 || tdata.cartypelist[index].Name_of_sales.indexOf(tdata.inp) != -1 || tdata.cartypelist[index].Vehicle_Name_CN.indexOf(tdata.inp) != -1) {
        arr.push(item)
      }
    })
    that.setData({
      arr: arr,
      show: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('cartype'))
     let that = this;
     that.setData({
       cartypelist: wx.getStorageSync('cartype')
     })
     wx.setNavigationBarTitle({
       title: options.title
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