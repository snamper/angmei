// pages/classify/year/year.js
var network = wx.getStorageSync('network')
var userid = wx.getStorageSync('userid')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car:'',
    cartype:'',
    thisyear:'',
    year:'',
    wheight:'',
    output:'',
    mikey:'',
    Manufacture:'',
    num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    /*加载提示框显示*/
    wx.showLoading({
      title: '加载中',
    })
    let that=this;
    wx.request({
      url: network+'/Mattrio/SelectCar/Years',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "Manufacture": options.car,
        "VehicleName": options.cartype,
        "Nameofsales": "",
        "userid": userid
      },
      method: 'POST',
      success: function (e) {
        that.setData({
          car: options.car,
          cartype: options.cartype,
          year: e.data,
          wheight: wx.getSystemInfoSync().windowHeight,
        })
        /*获取第一个年份对应的排量*/
        // console.log(userid)
        wx.request({
          url: network +'/Mattrio/SelectCar/Nameofsales',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "Manufacture": that.data.car,
            "VehicleName": that.data.cartype,
            "year": e.data[0].year,
            "userid": userid
          },
          method: 'POST',
          success: function (ev) {
             /*加载提示框隐藏*/
            wx.hideLoading()
            that.setData({
              thisyear: e.data[0].year,
              output: ev.data,
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
  yearclick:function(re){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network +'/Mattrio/SelectCar/Nameofsales',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "Manufacture": that.data.car,
        "VehicleName": that.data.cartype,
        "year": re.target.dataset.text,
        "userid": userid
      },
      method: 'POST',
      success: function (e) {
        wx.hideLoading()
        that.setData({
          thisyear: re.target.dataset.text,
          output: e.data,
          num: re.currentTarget.dataset.index
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
  /**/
  outputclick:function(re){
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network + '/Mattrio/SelectCar/QueryCar',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "Manufacture": that.data.car,
        "VehicleName": that.data.cartype,
        "year": this.data.thisyear,
        "Nameofsales": re.target.dataset.text,
        "userid": userid
      },
      method: 'POST',
      success: function (e) {
        // console.log(e.data.msg)
        if (e.data.recode == -3) {
          wx.showToast({
            title: '找件儿：' + e.data.msg,
            icon: 'none',
            duration: 1000
          })
          return false;
         }
        wx.hideLoading()
        that.setData({
          mikey: e.data.list[0].mikey,
          Manufacture: e.data.list[0].Manufacture_CN
        })
        wx.setStorageSync('data', e.data.list)
        // wx.navigateTo({
        //   url: '../selectpj/selectpj?car=' + that.data.car + "&cartype=" + that.data.cartype + "&year=" + that.data.thisyear + "&output=" + re.target.dataset.text + "&mikey=" + that.data.mikey
        // })
        wx.navigateTo({
          url: '../../particulars/particulars'
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
// + "&Manufacture=" + that.data.Manufacture
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