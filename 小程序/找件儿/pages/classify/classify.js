// pages/classify/classify.js
var util = require('../../utils/util.js');
var wxaSortPicker = require('../../utils/wxaSortPicker/wxaSortPicker.js');
var network = wx.getStorageSync('network')
var userid = wx.getStorageSync('userid')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginshow: 1,
     letterclick:"0",
     carname:[{
       name: '本田(东风本田)'
     }, {
         name: '本田(广汽本田)'
     }, {
         name: '本田汽车(进口)'
     }, {
         name:'日产(东风日产)'
     }, {
         name: '日产(进口)'
     }, {
         name: '日产(郑州日产)'
     }, {
         name: '现代(北京现代) '
     }, {
         name: '现代(进口)'
     }, {
         name: '丰田(广汽丰田)'
     }, {
         name: '丰田(一汽丰田)'
     }, {
         name: '丰田汽车(进口)'
     }, {
       name: '宝马(华晨宝马)'
     }, {
         name: '宝马(进口)'
     }, {
       name: '荣威(上汽荣威)'
     }, {
         name: '别克(上汽通用)'
     }, {
       name: '奔驰(北京奔驰)'
     }, {
         name: '奔驰(福建奔驰)'
     },{
       name: '奔驰(进口)'
     }],
     vin:'',
     car: '',
     cartype:'',
     meng:'true',
     right:'-80%',
     sclient:'',
     eclient:'',
     nickName:''
  },
  letterclick:function(e){
     var that=this
     that.setData({
       letterclick:"1"
     })
     that.setData({
       letterclick: "0"
     })   
  },
  /*ocr*/
  ocr:function(){
    if (this.data.nickName == '') {
      wx.showToast({
        title: '请在首页点击授权按钮',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
      url: '../ocr/ocr',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    wxaSortPicker.init(that.data.carname, that);      
  },
  wxaSortPickerItemTap: function (re) {
    if (this.data.nickName == '') {
      wx.showToast({
        title: '请在首页点击授权按钮',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.showLoading({
      title: '加载中',
    })
    let that=this;
    wx.request({
      url: network +'/Mattrio/SelectCar/VehicleName',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "Manufacture": re.target.dataset.text,
        "year": '',
        "userid": userid
      },
      method: 'POST',  
      success: function (e) {
        wx.hideLoading()
        that.setData({
          car: re.target.dataset.text,
          cartype: e.data,
          meng: '',
          right:'0'
        })
      }, fail:function(){
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
    
  },
  /*滑动*/
  rightstart: function (e) {
    let that=this;
    that.setData({
      sclient: e.changedTouches[0].clientX
    })
  },
  rightmove:function(){
    let that = this;
    console.log(1)
    that.setData({
      movetrue:'true'
    })
  },
  rightend: function (e) {
    let that=this;
    that.setData({
      eclient: e.changedTouches[0].clientX
    })
    if (that.data.movetrue){
      if (that.data.eclient - that.data.sclient < wx.getSystemInfoSync().windowWidth * 0.2) {
      } else {
        that.setData({
          meng: 'true',
          right: '-80%'
        })
      }
    }
    
  },
  /*meng点击*/
  mengclick: function () {
    let that = this;
    that.setData({
      meng: 'true',
      right: '-80%'
    })
  },
  /*车型点击*/
  cartypeclick:function(re){
    let that=this
    wx.navigateTo({
      url: 'year/year?car=' +that.data.car + "&cartype=" + re.target.dataset.text,
    })
  },
  /*VIN查询*/
  inpclick:function(){
    if (this.data.nickName == '') {
      wx.showToast({
        title: '请在首页点击授权按钮',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
      url: '../inde/vin/vin',
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
    var openid = wx.getStorageSync('openid')
    let that = this;
    wx.getUserInfo({
      lang: 'zh_CN ',
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
        })
        wx.request({
          url: network + '/Mattrio/LoginInterface/appwxlogin',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "openid": openid,
            "nickname": that.data.nickName
          },
          method: 'POST',
          success: function (re) {
            // console.log(re.data.phone)
            wx.setStorageSync('userid', re.data.user_id)
            // wx.setStorageSync('userid', '4927d30f-9ca7-1035-9ac6-76e82a18fca6')
            if (re.data.phone == '' || re.data.phone.length == 0) {
              that.setData({
                loginshow: !1
              })
              return false;
            }
            /*加载提示框隐藏*/
            // wx.hideLoading()
          }, fail: function () {
            wx.showToast({
              title: '找件儿：请求数据失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }, fail: function (res) {
        wx.showToast({
          title: '请在首页点击授权按钮',
          icon: 'none',
          duration: 1500
        })
      }
    })
    that.setData({
      meng: 'true',
      right: '-80%'
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